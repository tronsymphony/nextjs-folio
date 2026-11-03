import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import { Accent, PrimaryCta, SecondaryCta } from '../../components/ui/Cta';
import { Block, Callout, DataTable, FaqList, LinkRows, NumberedList, PageHero } from '../../components/ui/Page';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../lib/schema';
import { PERSON } from '../../lib/site';

// The lead service page (Keyword Planner, US, Sep 2025-Aug 2026): "ai integration" 5K a month, medium
// competition, bids $10-24; "ai integration services" 500, up 900%, low competition, bids $13-30;
// "chatgpt integration(s)" 500; "ai automation services" 500. No client results are claimed here; the proof is
// Safe Streets Map (the MCP server over its crash data in ../ailearn/01-mcp-crash-data, and the screenshot-to-draft
// ride listings). TODO(owner): add client AI projects as they ship.

export const metadata = {
  title: 'AI Integration Services: Connect ChatGPT & Claude to Your Business Tools',
  description:
    'AI integration services from a Los Angeles engineer: ChatGPT, Claude and AI agents connected to Shopify, HubSpot, QuickBooks, NetSuite or your own database, limited to the data and actions you allow. Starts with a free 30-minute call.',
  alternates: { canonical: '/ai-integration/' },
};

// Where AI usually plugs in, and what it does there.
const systems = [
  ['Store (Shopify, BigCommerce)', 'Answers about orders, stock and customers; drafts product copy; flags orders that need a person.'],
  ['CRM (HubSpot, Salesforce)', 'Looks up a contact’s history before a call, logs notes, drafts follow-ups for someone to send.'],
  ['ERP and accounting (NetSuite, QuickBooks)', 'Answers about invoices, open orders and inventory; turns emailed orders into draft records.'],
  ['Your own database', 'Plain-English questions over read-only views of your data, with the query shown next to the answer.'],
  ['Email and documents', 'Reads purchase orders, invoices and forms into structured records, checked before anything is saved.'],
  ['Slack or Teams', 'Where your team asks the questions, so the assistant lives in the tool people already use.'],
];

// The three ways AI gets connected, each suited to different work.
const shapes = [
  ['An assistant your team asks', 'Claude or ChatGPT connected to your tools through MCP or a custom connector. People ask questions and request actions; the assistant works under their permissions.', 'Questions spread across several systems'],
  ['A pipeline that runs on its own', 'Documents or events come in, a model reads them, code checks the result against your system, and a draft waits for approval.', 'Repetitive data entry from emails and PDFs'],
  ['A feature in your own product', 'Search, summaries or a chat built into your app or portal through a model API, using your data and your rules.', 'Customers who need answers from your data'],
];

// How access is kept narrow. Each one is a design choice, not a setting someone remembers to turn on.
const guardrails = [
  'Read-only first. The assistant starts by reading; each action it may take (create a draft, update a field) is added on purpose.',
  'Scoped to a role. It connects as a user or service account with only the permissions the job needs, never an admin key.',
  'Drafts, not final records. Anything it creates waits for a person to approve until it has earned trust on real work.',
  'Code checks the model. Prices, quantities, customers and duplicates are verified against your system by code, not by the model’s judgment.',
  'Every call logged. What was asked, what the assistant read and what it changed, so mistakes can be traced.',
  'Keys stay on the server. API keys and tokens never reach a browser, a prompt or a shared document.',
];

const steps = [
  'A free 30-minute call: the work you want AI to take on, the systems involved, and whether AI is the right tool at all.',
  'One workflow, chosen together. The one with the most hours spent and the clearest right answer usually goes first.',
  'A fixed quote and date for that workflow, with what it will and won’t do written down.',
  'Built against your real data in a test setup, then run beside your team before it touches anything live.',
  'Handover: the code, the prompts, the logs and a short guide are yours. Monthly support if you want it.',
];

const faqs = [
  {
    q: 'What is AI integration?',
    a: 'Connecting an AI model, such as ChatGPT or Claude, to the software your business already runs on, so it can read your real data and do useful work with it: answer questions about orders, turn emailed documents into records, or draft replies from a customer’s history. Without integration, an assistant only knows what someone pastes into it.',
  },
  {
    q: 'What is MCP, and do I need it?',
    a: 'The Model Context Protocol is an open standard for connecting AI assistants to tools and data. A system that offers an MCP server can be used by any assistant that supports MCP, including Claude and ChatGPT. Several business platforms now publish their own MCP servers; NetSuite’s is its AI Connector Service. Where one exists and fits, I use it; where it doesn’t, I build a small server or a direct API integration.',
  },
  {
    q: 'ChatGPT or Claude?',
    a: 'It depends on the work and on which assistant your team already pays for. Both connect to tools, both read documents well, and for most business workflows the integration matters more than the model. I build so the model can be swapped later without redoing the rest.',
  },
  {
    q: 'Will my data be used to train AI models?',
    a: 'That is set by each provider’s terms for the plan or API you use, so it is one of the first things we check. I set up the integration on a plan whose terms fit your data, and keep what is sent to the model to what the task needs.',
  },
  {
    q: 'Is this the same as Zapier or Make?',
    a: 'Those tools are good for simple triggers, and if one covers your workflow, use it. Custom integration is for work they handle poorly: messy documents, checks against your own rules, actions that need approval, or an assistant that answers questions across several systems.',
  },
  {
    q: 'What does it cost?',
    a: 'It starts with a free 30-minute call. After that each workflow is quoted at a fixed price before work starts, so you know the cost before committing.',
  },
  {
    q: 'Do you work with businesses in Los Angeles?',
    a: `Yes. I’m based in ${PERSON.location} and work with businesses across California and the U.S., remotely or in person in LA.`,
  },
];

export default function AiIntegrationPage() {
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            '@id': url('/ai-integration/#service'),
            name: 'AI integration services',
            serviceType: 'AI integration',
            provider: { '@id': ORG_ID },
            url: url('/ai-integration/'),
            areaServed: [
              { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'California' } },
              { '@type': 'Country', name: 'United States' },
            ],
          },
          breadcrumbNode([
            ['Home', '/'],
            ['AI integration', '/ai-integration/'],
          ]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/', 'Home']}
          eyebrow="ChatGPT · Claude · MCP · AI agents"
          title={<>AI integration: AI that works with <Accent>your tools and data.</Accent></>}
          lede="I connect ChatGPT, Claude and AI agents to the systems your business runs on, from Shopify and HubSpot to QuickBooks, NetSuite and your own database, so they can answer real questions and take on real work, limited to the data and actions you allow."
          facts={[
            ['Starts with', 'Free 30-minute call'],
            ['Pricing', 'Fixed quote per workflow'],
            ['Connects', 'Claude, ChatGPT, any MCP client'],
            ['Based in', PERSON.location],
          ]}
        >
          <PrimaryCta href="/call/">Book a free 30-min call</PrimaryCta>
          <SecondaryCta href="/ai-document-processing/">AI document processing</SecondaryCta>
        </PageHero>

        <Block index="01" label="What gets connected" title="Where AI usually earns its place">
          <DataTable columns={['System', 'What the AI does there']} rows={systems} />
        </Block>

        <Block index="02" label="Three ways to integrate AI">
          <DataTable columns={['Shape', 'How it works', 'Best for']} rows={shapes} />
        </Block>

        <Block index="03" label="Limits, built in" title={<>It can only see and do <Accent>what you allow.</Accent></>}>
          <NumberedList items={guardrails} tone="accent" />
        </Block>

        <Block index="04" label="A first project">
          <NumberedList items={steps} />
        </Block>

        <Block index="05" label="Built this way" title={<>On my own product: <Accent>Safe Streets Map.</Accent></>}>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-6">
            Safe Streets Map turns California’s public crash records into maps and thousands of pages. I built an MCP server over its
            data so Claude can answer questions like “which streets in Pasadena have the most serious crashes?” through four
            read-only tools: find a city’s exact name, a city’s totals, the streets with the most crashes, and the crashes near a
            point. The assistant can read the records but never change them, and its answers come from the data rather than the
            model’s memory.
          </p>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-6">
            The same site uses Claude to read a bike club’s Instagram post into a draft group-ride listing, which a person checks and
            approves before it goes live.
          </p>
          <p className="text-lg text-ink leading-relaxed max-w-3xl mb-10">
            Swap crash records for your orders, customers and inventory, and it’s the same build: your team asks in plain English,
            and the answer comes from your own systems, within the limits you set.
          </p>
          <LinkRows
            items={[
              { href: 'https://www.safestreetsmap.com/', tag: 'Live site', title: 'safestreetsmap.com', body: 'California crash maps, city pages and live traffic, built from public data.' },
              { href: '/work/safe-streets-map-crash-data-platform/', tag: 'Case study', title: 'How Safe Streets Map is built' },
            ]}
          />
        </Block>

        <Block index="06" label="When not to">
          <Callout label="Honest scope">
            If a spreadsheet formula, a Zapier step or a built-in feature of your software already does the job, use it. AI is worth
            building when the input is messy, the volume is real and a person can check the result quickly.
          </Callout>
        </Block>

        <Block index="07" label="Related">
          <LinkRows
            items={[
              { href: '/ai-document-processing/', tag: 'Service', title: 'AI document processing', body: 'Emailed orders, invoices and forms read into your system and checked before saving.' },
              { href: '/api-integration-services/', tag: 'Service', title: 'API integration services', body: 'The system-to-system plumbing AI depends on: stores, CRMs, ERPs and 3PLs kept in sync.' },
              { href: '/netsuite/netsuite-ai/', tag: 'Guide', title: 'NetSuite AI: what’s built in, and what’s worth adding' },
            ]}
          />
        </Block>

        <Block index="08" label="Questions">
          <FaqList faqs={faqs} />
        </Block>
      </div>
      <Footer />
    </>
  );
}
