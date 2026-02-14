import { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Layout,
  Webhook,
  Cpu,
  Database,
  Server,
  Lock,
  TestTube,
  Cloud,
  Terminal,
  Code2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Categories - CodeSnippets",
  description: "Browse code snippets by category",
};

const categories = [
  {
    name: "Utility Functions",
    description: "Helper functions and common utilities",
    icon: Wrench,
    slug: "Utility Functions",
  },
  {
    name: "Components",
    description: "UI components and layout elements",
    icon: Layout,
    slug: "Components",
  },
  {
    name: "Hooks",
    description: "Custom React hooks and logic reuse",
    icon: Webhook,
    slug: "Hooks",
  },
  {
    name: "Algorithms",
    description: "Sorting, searching, and common algorithms",
    icon: Cpu,
    slug: "Algorithms",
  },
  {
    name: "Data Structures",
    description: "Trees, graphs, and data organization",
    icon: Code2,
    slug: "Data Structures",
  },
  {
    name: "API",
    description: "API routes, handlers, and integration",
    icon: Server,
    slug: "API",
  },
  {
    name: "Database",
    description: "Schemas, queries, and migrations",
    icon: Database,
    slug: "Database",
  },
  {
    name: "Authentication",
    description: "Auth providers, sessions, and security",
    icon: Lock,
    slug: "Authentication",
  },
  {
    name: "Testing",
    description: "Unit tests, integration tests, and mocks",
    icon: TestTube,
    slug: "Testing",
  },
  {
    name: "DevOps",
    description: "CI/CD, containers, and deployment",
    icon: Cloud,
    slug: "DevOps",
  },
];

export default function CategoriesPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Browse our collection of code snippets by category.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/snippets?category=${encodeURIComponent(category.slug)}`}
            >
              <Card className="h-full transition-colors hover:bg-muted/50 hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
