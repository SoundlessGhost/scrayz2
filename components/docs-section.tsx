"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Code,
  Zap,
  Shield,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

const quickstartSteps = [
  {
    step: 1,
    title: "Get Your API Key",
    description:
      "Sign up for a free account and generate your API key from the dashboard.",
    code: `// Your API key will look like this:
const API_KEY = 'sk_live_1234567890abcdef'`,
  },
  {
    step: 2,
    title: "Make Your First Call",
    description:
      "Use our REST API to fetch LinkedIn profile data with a simple HTTP request.",
    code: `fetch('https://api.scrayz.com/v1/profile', {
  method: 'GET',
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://linkedin.com/in/johndoe'
  })
})`,
  },
  {
    step: 3,
    title: "Handle the Response",
    description:
      "Process the structured JSON response containing profile information.",
    code: `const response = await fetch(/* ... */);
const data = await response.json();

console.log(data.name);        // "John Doe"
console.log(data.title);       // "Senior Engineer"
console.log(data.company);     // "TechCorp Inc."`,
  },
  {
    step: 4,
    title: "Set Up Webhooks",
    description:
      "Configure webhooks for real-time notifications when data is ready.",
    code: `// Configure webhook endpoint
POST /v1/webhooks
{
  "url": "https://yourapp.com/webhook",
  "events": ["profile.completed", "company.updated"]
}`,
  },
];

const codeExamples = {
  javascript: `// JavaScript/Node.js Example
const LinkedInAPI = require('@linkedinapi/sdk');

const client = new LinkedInAPI({
  apiKey: process.env.LINKEDIN_API_KEY
});

async function getProfile(linkedinUrl) {
  try {
    const profile = await client.profiles.get({
      url: linkedinUrl,
      fields: ['name', 'title', 'company', 'experience']
    });
    
    return profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
}

// Usage
const profile = await getProfile('https://linkedin.com/in/johndoe');
console.log(profile);`,

  python: `# Python Example
import requests
import os

class LinkedInAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.linkedinapi.com/v1"
        
    def get_profile(self, linkedin_url):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        data = {"url": linkedin_url}
        
        response = requests.post(
            f"{self.base_url}/profile",
            headers=headers,
            json=data
        )
        
        response.raise_for_status()
        return response.json()

# Usage
client = LinkedInAPI(os.getenv('LINKEDIN_API_KEY'))
profile = client.get_profile('https://linkedin.com/in/johndoe')
print(profile)`,

  curl: `# cURL Example
curl -X POST "https://api.linkedinapi.com/v1/profile" \\
  -H "Authorization: Bearer sk_live_1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://linkedin.com/in/johndoe",
    "fields": ["name", "title", "company", "experience"]
  }'

# Response
{
  "id": "profile_123456",
  "name": "John Doe",
  "title": "Senior Software Engineer",
  "company": "TechCorp Inc.",
  "location": "San Francisco, CA",
  "experience": [
    {
      "title": "Senior Software Engineer",
      "company": "TechCorp Inc.",
      "duration": "2022 - Present"
    }
  ]
}`,
};

export function DocsSection() {
  const [copied, setCopied] = useState<string | null>(null); // holds current language key

  const handleCopy = async (code: string, lang: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(lang);
      toast.success("Copied to clipboard", {
        description: `${lang} snippet copied.`,
      });
      setTimeout(() => setCopied(null), 1200);
    } catch {
      // Fallback (older browsers / http)
      try {
        const ta = document.createElement("textarea");
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(lang);
        setTimeout(() => setCopied(null), 1200);
        toast.success("Copied to clipboard", {
          description: `${lang} snippet copied.`,
        });
      } catch {
        toast.error("Copy failed", { description: "Please copy manually." });
      }
    }
  };
  return (
    <section id="docs" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-balance">
            Developer Documentation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Everything you need to integrate LinkedIn data into your
            applications. Get started in minutes with our comprehensive guides.
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Quick Start Guide
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickstartSteps.map((step, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center font-bold text-sm mb-2">
                    {step.step}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg">
                    <pre className="text-xs font-mono whitespace-pre overflow-x-auto px-2 py-4 rounded-md">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Code Examples</span>
            </CardTitle>
            <CardDescription>
              Ready-to-use code snippets in your favorite programming language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
              </TabsList>

              {Object.entries(codeExamples).map(([language, code]) => (
                <TabsContent key={language} value={language} className="mt-4">
                  <div className="relative">
                    <div className="bg-muted rounded-lg">
                      <pre className="text-sm font-mono overflow-x-auto whitespace-pre p-4 rounded-md">
                        <code>{code}</code>
                      </pre>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-transparent"
                      onClick={() => handleCopy(code, language)}
                      aria-live="polite"
                      aria-label={copied === language ? "Copied" : "Copy code"}
                    >
                      {copied === language ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>

                    {/* tiny “copied” badge that fades in/out */}
                    <span
                      className={`pointer-events-none absolute -top-2 right-2 -translate-y-full rounded-md px-2 py-1 text-xs
                          transition-opacity ${
                            copied === language ? "opacity-100" : "opacity-0"
                          }
                          bg-foreground text-background`}
                    >
                      Copied!
                    </span>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>Rate Limits & Best Practices</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Respect Rate Limits</p>
                    <p className="text-sm text-muted-foreground">
                      Our API enforces rate limits to ensure fair usage.
                      Implement exponential backoff for retries.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Use Webhooks</p>
                    <p className="text-sm text-muted-foreground">
                      For bulk operations, use webhooks instead of polling to
                      get notified when data is ready.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Cache Responses</p>
                    <p className="text-sm text-muted-foreground">
                      Cache API responses when appropriate to reduce costs and
                      improve performance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Legal & Compliance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm font-medium text-yellow-800 mb-2">
                  Important Legal Notice
                </p>
                <p className="text-sm text-yellow-700">
                  Users are responsible for ensuring compliance with LinkedIn&apos;s
                  Terms of Service and applicable data protection laws. Only
                  scrape data you have legitimate rights to access.
                </p>
              </div>
              <div className="space-y-2">
                <Link href="/toc" className="text-sm hover:underline block">
                  → Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm  hover:underline block"
                >
                  → Privacy Policy
                </Link>
                <Link
                  href="/compliance"
                  className="text-sm  hover:underline block"
                >
                  → Compliance Guidelines
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentation Links */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8">
            Explore Full Documentation
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="w-8 h-8 mx-auto mb-2" />
                <CardTitle>API Reference</CardTitle>
                <CardDescription>
                  Complete endpoint documentation with examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full group bg-transparent"
                >
                  View API Docs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="w-8 h-8 mx-auto mb-2" />
                <CardTitle>SDKs & Libraries</CardTitle>
                <CardDescription>
                  Official SDKs for popular programming languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full group bg-transparent"
                >
                  Browse SDKs
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <CardTitle>Tutorials</CardTitle>
                <CardDescription>
                  Step-by-step guides for common use cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full group bg-transparent"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
