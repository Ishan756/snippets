describe('Authentication', () => {
  const getTestUser = () => ({
    email: `test_${Date.now()}_${Math.floor(Math.random() * 1000)}@example.com`,
    password: 'Password123!',
  });

  it('should sign up successfully', () => {
    const user = getTestUser();
    cy.visit('/auth/signup');
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').contains('Sign Up').click();
    
    // AuthForm shows a success toast: toast.success("Account created successfully")
    cy.contains('Account created successfully', { timeout: 10000 }).should('be.visible');
    
    // Then it should redirect to "/"
    cy.url({ timeout: 10000 }).should('eq', Cypress.config().baseUrl + '/');
  });

  it('should sign in successfully', () => {
    // We can't easily sign in with the user from the previous test if it failed or if isolation is strict
    // but here we expect the user to exist if we want to test sign in.
    // Let's create a fresh user for sign in test to be independent.
    const user = getTestUser();
    cy.request('POST', '/api/auth/register', {
      email: user.email,
      password: user.password
    });

    cy.visit('/auth/signin');
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').contains('Sign In').click();

    cy.contains('Signed in successfully', { timeout: 10000 }).should('be.visible');
    cy.url({ timeout: 10000 }).should('eq', Cypress.config().baseUrl + '/');
  });

  it('should show error for invalid credentials', () => {
    cy.visit('/auth/signin');
    cy.get('input[name="email"]').type('nonexistent@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').contains('Sign In').click();

    // Check for error toast or message (toast.error("Invalid email or password"))
    cy.contains('Invalid email or password', { timeout: 10000 }).should('be.visible');
  });
});
