import type { Metadata } from 'next';
import workflowsData from '@/lib/n8n-workflows/workflows.json';
import { WorkflowsDisplay } from './workflows-display';

const canonicalUrl = 'https://www.smartcalculator.online/free-n8n-workflow-automation-templates';

export const metadata: Metadata = {
  title: '2000+ Free n8n Workflow Automation Templates',
  description: 'Discover n8n workflow automation templates to streamline tasks, integrate apps, and build AI-powered workflows with ease and efficiency',
  keywords: [
    'n8n workflow automation',
    'n8n templates',
    'workflow automation templates',
    'n8n workflow examples',
    'n8n ai workflow automation',
    'n8n open source workflow automation',
    'workflow automation using n8n',
    'n8n workflow builder',
    'n8n workflow ideas',
    'n8n workflow integrations'
  ],
  alternates: {
    canonical: canonicalUrl,
    languages: {
      'x-default': canonicalUrl,
      'en': canonicalUrl,
    },
  },
  openGraph: {
    title: '2000+ Free n8n Workflow Automation Templates',
    description: 'Discover n8n workflow automation templates to streamline tasks, integrate apps, and build AI-powered workflows with ease and efficiency',
    url: canonicalUrl,
    siteName: 'Smart Calculator',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'n8n Workflow Automation Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2000+ Free n8n Workflow Automation Templates',
    description: 'Discover n8n workflow automation templates to streamline tasks, integrate apps, and build AI-powered workflows with ease and efficiency',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function N8nWorkflowsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            2000+ Free n8n Workflow Automation Templates
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Download Ready Workflows Instantly
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-12 max-w-none">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-md border-2 border-blue-200">
            <p className="text-base md:text-lg leading-relaxed mb-0 text-gray-800">
              <strong className="text-blue-700">n8n workflow automation</strong> allows businesses and developers to automate repetitive tasks, integrate multiple apps, and build complex workflows without coding. With <strong className="text-blue-700">n8n workflow automation templates</strong>, users can quickly deploy pre-built workflows for common tasks. These templates, along with <strong className="text-blue-700">n8n workflow automation examples</strong>, provide a foundation for building custom automations, making <strong className="text-blue-700">workflow automation using n8n</strong> accessible to beginners and experts alike. n8n&apos;s open-source model and AI integrations enhance flexibility, offering <strong className="text-blue-700">n8n ai workflow automation</strong> and scalable deployment options.
            </p>
          </div>
        </section>

        {/* Workflows Display Component */}
        <section className="mb-16">
          <WorkflowsDisplay data={workflowsData} />
        </section>

        {/* What is n8n Section */}
        <section className="mb-12 max-w-none">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">What is n8n Workflow Automation?</h2>
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200 space-y-4">
            <p className="text-base leading-relaxed text-gray-700">
              <strong className="text-gray-900">n8n workflow automation</strong> is an open-source tool designed to streamline business processes and automate repetitive tasks. It connects multiple applications, databases, and APIs, enabling workflow automation with n8n across marketing, sales, HR, and IT operations.
            </p>
            <div className="space-y-4 mt-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 mt-0 text-gray-900">Definition</h3>
                  <p className="text-base leading-relaxed mb-0 text-gray-700">
                    At its core, what is n8n workflow automation? It&apos;s a platform that allows users to create automated sequences of actions (called n8n workflows) without extensive coding knowledge.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 mt-0 text-gray-900">Open Source Advantage</h3>
                  <p className="text-base leading-relaxed mb-0 text-gray-700">
                    n8n open source workflow automation lets users self-host and fully control their workflows, unlike proprietary platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-12 max-w-none">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Benefits of Using n8n Workflow Automation Tool</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 mt-0 flex items-center gap-2 text-gray-900">
                <span className="text-2xl">⚡</span>
                Efficiency and Productivity
              </h3>
              <p className="text-base leading-relaxed mb-0 text-gray-700">
                Automate repetitive tasks, freeing up time for strategic work.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 mt-0 flex items-center gap-2 text-gray-900">
                <span className="text-2xl">🔧</span>
                Flexibility
              </h3>
              <p className="text-base leading-relaxed mb-0 text-gray-700">
                Supports hundreds of integrations with cloud services and on-premise systems.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 mt-0 flex items-center gap-2 text-gray-900">
                <span className="text-2xl">💰</span>
                Cost-Effective
              </h3>
              <p className="text-base leading-relaxed mb-0 text-gray-700">
                The open-source nature reduces dependency on expensive alternatives.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 mt-0 flex items-center gap-2 text-gray-900">
                <span className="text-2xl">🤖</span>
                AI Integration
              </h3>
              <p className="text-base leading-relaxed mb-0 text-gray-700">
                n8n workflow with AI allows predictive analytics, content generation, and intelligent decision-making.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 md:col-span-2">
              <h3 className="text-xl font-semibold mb-3 mt-0 flex items-center gap-2 text-gray-900">
                <span className="text-2xl">📋</span>
                Customizable Templates
              </h3>
              <p className="text-base leading-relaxed mb-0 text-gray-700">
                Pre-built n8n workflow automation templates accelerate deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="mb-12 max-w-none">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Getting Started: n8n Workflow Automation for Beginners</h2>
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
            <p className="text-base leading-relaxed mb-6 text-gray-700">For those new to automation:</p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 mt-0 text-gray-900">Explore Templates</h3>
                  <p className="text-base leading-relaxed mb-0 text-gray-700">
                    Start with n8n workflow templates for email campaigns, Slack notifications, or Google Sheets updates.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 mt-0 text-gray-900">Understand Nodes</h3>
                  <p className="text-base leading-relaxed mb-0 text-gray-700">
                    Each workflow consists of &quot;nodes&quot; that represent actions or triggers.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 mt-0 text-gray-900">Test and Deploy</h3>
                  <p className="text-base leading-relaxed mb-0 text-gray-700">
                    Use n8n workflow deployment options for cloud or n8n workflow self hosted setups.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-base leading-relaxed mb-0 text-gray-800">
                <strong className="text-blue-700">Tip:</strong> Beginners should check n8n workflow tutorial resources and n8n workflow automation documentation for detailed guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Examples Section */}
        <section className="mb-12 max-w-none">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Popular n8n Workflow Automation Examples</h2>
          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
            <p className="text-base leading-relaxed mb-6 text-gray-700">Here are real-world n8n workflow automation examples:</p>
            <ul className="space-y-3 list-disc list-inside">
              <li className="text-base leading-relaxed text-gray-700"><strong className="text-gray-900">Lead Capture Automation:</strong> Connect a website form to CRM and email notification.</li>
              <li className="text-base leading-relaxed text-gray-700"><strong className="text-gray-900">Social Media Posting:</strong> Automate posting on multiple platforms from a single source.</li>
              <li className="text-base leading-relaxed text-gray-700"><strong className="text-gray-900">Customer Support Workflow:</strong> Track tickets in Zendesk and notify Slack channels.</li>
              <li className="text-base leading-relaxed text-gray-700"><strong className="text-gray-900">Data Syncing:</strong> Automate updates between Airtable, Google Sheets, and internal databases.</li>
            </ul>
            <p className="text-base leading-relaxed mt-6 mb-0 text-gray-700">
              These examples highlight the versatility of workflow automation using n8n in diverse industries.
            </p>
          </div>
        </section>

        {/* Workflow Ideas Section */}
        <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">n8n Workflow Ideas and Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">📢 Marketing Automation</h3>
              <p className="text-base leading-relaxed mb-0">
                Email campaigns, social media posting, analytics reporting.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">💼 Sales Automation</h3>
              <p className="text-base leading-relaxed mb-0">
                Lead enrichment, follow-ups, CRM updates.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">⚙️ Operations</h3>
              <p className="text-base leading-relaxed mb-0">
                Data migration, employee onboarding, and notifications.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">🤖 AI-Enhanced Automation</h3>
              <p className="text-base leading-relaxed mb-0">
                n8n ai workflow automation can handle text summarization, sentiment analysis, or automated content generation.
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Builder Best Practices */}
        <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">n8n Workflow Builder and Best Practices</h2>
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <p className="text-base leading-relaxed mb-6">
              The <strong>n8n workflow builder</strong> is an intuitive visual interface to create and manage automations.
            </p>
            <h3 className="text-xl font-semibold mb-4 mt-0">Best Practices:</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li className="text-base leading-relaxed">Keep workflows modular for easier maintenance.</li>
              <li className="text-base leading-relaxed">Use descriptive node names and comments.</li>
              <li className="text-base leading-relaxed">Monitor executions for errors.</li>
              <li className="text-base leading-relaxed">Version-control critical workflows. (n8n workflow best practices)</li>
            </ul>
          </div>
        </section>

        {/* Templates Section */}
        <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">n8n Workflow Templates</h2>
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <p className="text-base leading-relaxed mb-6">
              <strong>n8n workflow automation templates</strong> save time by providing pre-configured workflows:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-base">Email notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-base">Slack alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-base">Google Sheets updates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-base">CRM integrations</span>
              </div>
            </div>
            <p className="text-base leading-relaxed mt-6 mb-0">
              Templates are excellent starting points for beginners and serve as <strong>n8n workflow ideas</strong> for advanced users.
            </p>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">n8n Workflow Integrations</h2>
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <p className="text-base leading-relaxed mb-6">
              <strong>n8n workflow integrations</strong> cover over 200 apps and services:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2 mt-0">Cloud Tools</h4>
                <p className="text-sm text-muted-foreground mb-0">Google Workspace, Slack, Notion</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 mt-0">Marketing</h4>
                <p className="text-sm text-muted-foreground mb-0">HubSpot, Mailchimp</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 mt-0">AI</h4>
                <p className="text-sm text-muted-foreground mb-0">OpenAI, GPT-based services</p>
              </div>
            </div>
            <p className="text-base leading-relaxed mt-6 mb-0">
              Integrations are critical for building seamless <strong>n8n automations</strong>.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">n8n Workflow vs Zapier</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-4 text-left font-semibold">Feature</th>
                  <th className="border border-border p-4 text-left font-semibold">n8n</th>
                  <th className="border border-border p-4 text-left font-semibold">Zapier</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-4">Open Source</td>
                  <td className="border border-border p-4 text-green-600 dark:text-green-400 font-semibold">✅</td>
                  <td className="border border-border p-4 text-red-600 dark:text-red-400 font-semibold">❌</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-4">Self-Hosted Option</td>
                  <td className="border border-border p-4 text-green-600 dark:text-green-400 font-semibold">✅</td>
                  <td className="border border-border p-4 text-red-600 dark:text-red-400 font-semibold">❌</td>
                </tr>
                <tr>
                  <td className="border border-border p-4">AI Workflows</td>
                  <td className="border border-border p-4 text-green-600 dark:text-green-400 font-semibold">✅</td>
                  <td className="border border-border p-4">Limited</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-4">Cost</td>
                  <td className="border border-border p-4">Free/Open-source</td>
                  <td className="border border-border p-4">Paid tiers</td>
                </tr>
                <tr>
                  <td className="border border-border p-4">Custom Integrations</td>
                  <td className="border border-border p-4">High</td>
                  <td className="border border-border p-4">Medium</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-6 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-base leading-relaxed mb-0">
              <strong>Takeaway:</strong> n8n offers more flexibility, control, and AI integration than Zapier, especially for developers and businesses needing workflow automation using n8n.
            </p>
          </div>
        </section>

        {/* Deployment Options */}
        <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">Deployment Options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">☁️ Cloud</h3>
              <p className="text-base leading-relaxed mb-0">
                Hosted on n8n.cloud for convenience.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">🖥️ Self-Hosted</h3>
              <p className="text-base leading-relaxed mb-0">
                Full control over data and infrastructure. (n8n workflow self hosted)
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">🐳 Docker</h3>
              <p className="text-base leading-relaxed mb-0">
                Simplifies local and server deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Alternatives Section */}
        <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">n8n Workflow Alternatives</h2>
          <div className="bg-card rounded-lg p-8 shadow-sm border">
            <p className="text-base leading-relaxed mb-6">While n8n is robust, alternatives include:</p>
            <ul className="space-y-3 list-disc list-inside">
              <li className="text-base leading-relaxed"><strong>Zapier</strong> – simpler, closed-source automation</li>
              <li className="text-base leading-relaxed"><strong>Make (Integromat)</strong> – visually intuitive but subscription-based</li>
              <li className="text-base leading-relaxed"><strong>Tray.io</strong> – enterprise-level integrations</li>
            </ul>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">FAQs about n8n Workflow Automation</h2>
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">Q1: What is n8n workflow automation?</h3>
              <p className="text-base leading-relaxed mb-0">
                <strong>A:</strong> It&apos;s an open-source platform to automate repetitive tasks, connect apps, and build n8n workflows without coding.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">Q2: Are there templates for beginners?</h3>
              <p className="text-base leading-relaxed mb-0">
                <strong>A:</strong> Yes, n8n workflow templates provide ready-to-use workflows, perfect for n8n workflow automation for beginners.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">Q3: Can I use AI with n8n workflows?</h3>
              <p className="text-base leading-relaxed mb-0">
                <strong>A:</strong> Absolutely. n8n ai workflow automation allows AI-driven content generation, analytics, and decision-making.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">Q4: Is n8n self-hosted?</h3>
              <p className="text-base leading-relaxed mb-0">
                <strong>A:</strong> Yes, n8n workflow self hosted lets you run workflows on your servers for full control.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="text-xl font-semibold mb-3 mt-0">Q5: How does n8n compare to Zapier?</h3>
              <p className="text-base leading-relaxed mb-0">
                <strong>A:</strong> n8n is open-source, self-hostable, and more flexible for custom workflow automation with n8n, while Zapier is easier for simple automations but less customizable.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">Conclusion</h2>
          <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg p-8 shadow-sm border border-primary/20">
            <p className="text-base leading-relaxed mb-4">
              <strong>n8n workflow automation templates</strong> provide a fast and efficient way to implement automated workflows. From <strong>n8n workflow automation for beginners</strong> to advanced <strong>n8n ai workflow automation</strong>, this platform is versatile, scalable, and cost-effective. Leveraging <strong>workflow automation using n8n</strong> can drastically improve operational efficiency, reduce errors, and enable innovative solutions across industries.
            </p>
            <p className="text-base leading-relaxed mb-0">
              By using <strong>n8n workflow automation examples</strong>, templates, and best practices, businesses can fully unlock the potential of automated processes while maintaining control through <strong>n8n open source workflow automation</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
