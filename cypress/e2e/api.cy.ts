describe('API Endpoints', () => {
  const testUser = {
    email: `api_test_${Date.now()}@example.com`,
    password: 'Password123!',
    name: 'Test API User'
  };
  let createdSnippetId: string;

  before(() => {
    // Register the user - fail on status code false because we might run this multiple times
    cy.request({
      method: 'POST',
      url: '/api/auth/register',
      body: {
        email: testUser.email,
        password: testUser.password,
        name: testUser.name
      },
      failOnStatusCode: false
    });
  });

  beforeEach(() => {
    cy.login(testUser.email, testUser.password);
  });

  describe('Auth API', () => {
    it('POST /api/auth/register should fail for existing email', () => {
      cy.request({
        method: 'POST',
        url: '/api/auth/register',
        body: {
          email: testUser.email,
          password: testUser.password
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(409);
      });
    });
  });

  describe('Snippets API', () => {
    it('GET /api/snippets should return list of snippets', () => {
      cy.request('GET', '/api/snippets').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });

    it('POST /api/snippets should create a new snippet (Authenticated)', () => {
      const newSnippet = {
        title: 'Cypress Test Snippet',
        description: 'Testing snippet creation via Cypress',
        code: 'console.log("Hello Cypress")',
        language: 'JavaScript',
        category: 'Testing',
        tags: ['test', 'cypress'],
        isPublic: true
      };

      cy.request('POST', '/api/snippets', newSnippet).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        createdSnippetId = response.body.id;
        expect(response.body.title).to.eq(newSnippet.title);
      });
    });

    it('GET /api/snippets/[id] should return a specific snippet', () => {
      if (!createdSnippetId) throw new Error('Snippet ID not found');
      cy.request('GET', `/api/snippets/${createdSnippetId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(createdSnippetId);
      });
    });

    it('GET /api/snippets/my should return user snippets', () => {
      cy.request('GET', '/api/snippets/my').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        const found = response.body.find((s: any) => s.id === createdSnippetId);
        expect(found).to.not.be.undefined;
      });
    });
  });

  describe('User API', () => {
    it('GET /api/user/profile should return user profile (Protected)', () => {
      cy.request('GET', '/api/user/profile').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('email', testUser.email);
      });
    });

    it('PATCH /api/user/profile should update user profile', () => {
      const updatedName = 'Updated AI User';
      cy.request('PATCH', '/api/user/profile', { name: updatedName }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(updatedName);
      });
    });
  });

  describe('AI API', () => {
    it('POST /api/ai/generate-snippet should return a generated snippet', () => {
      // Note: This calls the real Gemini API. In a real CI environment, we would stub this.
      // For now, we test the endpoint integration.
      cy.request({
        method: 'POST',
        url: '/api/ai/generate-snippet',
        body: { prompt: 'generate a hello world in javascript' },
        timeout: 30000 // Increase timeout for AI response
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('title');
        expect(response.body).to.have.property('code');
        expect(response.body).to.have.property('language', 'JavaScript');
      });
    });
  });
});
