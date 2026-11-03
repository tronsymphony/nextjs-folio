import HomeFollow from '../../components/home-follow';
import Footer from '../../components/footer';
import JsonLd from '../../components/JsonLd';
import { Accent, PrimaryCta, SecondaryCta } from '../../components/ui/Cta';
import { Block, Callout, DataTable, FaqList, LinkRows, NumberedList, PageHero, Prose } from '../../components/ui/Page';
import { ORG_ID, breadcrumbNode, faqNode, graph, url } from '../../lib/schema';
import { PERSON } from '../../lib/site';

// Keyword research 2026-11-03 (Keyword Planner, US): "mcp server for claude" and "mcp server for ai" 500 a month each,
// both up 900% in a year; "claude integration with salesforce" 50 with bids to $103; "ai integration via mcp" 50.
// Official servers named here were checked on the vendors' own pages on 2026-11-03: Oracle's NetSuite AI Connector
// Service (docs.oracle.com, the FAQ says NetSuite provides the MCP server and the Administrator role can't use it),
// HubSpot's remote MCP server (developers.hubspot.com, OAuth, CRM data) and Intuit's open-source local QuickBooks
// Online MCP server (an early preview, per Intuit's blog). Shopify and Salesforce sources disagreed, so they aren't
// named. Recheck before adding a system. The proof is the MCP server over Safe Streets Map's crash data
// (../ailearn/01-mcp-crash-data). No client results are claimed.

export const metadata = {
  title: 'Custom MCP Servers: Connect Claude & ChatGPT to Your Systems',
  description:
    'Custom MCP server development: Claude, ChatGPT and other AI assistants connected to NetSuite, HubSpot, QuickBooks, your store or your own database through the Model Context Protocol, read-only first and limited to what each person may see. Los Angeles engineer, free 30-minute call.',
  alternates: { canonical: '/mcp-server-development/' },
};

const systems = [
  ['NetSuite', 'Oracle’s NetSuite AI Connector Service: NetSuite provides the MCP server; it needs a role with the MCP Server Connection permission (the Administrator role can’t use it).', 'Your own saved searches as named tools, your business rules, or NetSuite answered together with other systems.'],
  ['HubSpot', 'HubSpot’s remote MCP server, connected with OAuth, for CRM data.', 'HubSpot joined with your ERP or store, or actions shaped around your own pipeline.'],
  ['QuickBooks Online', 'Intuit’s open-source MCP server, released as an early preview to run locally.', 'A hosted server your whole team can use, with each person’s access set on purpose.'],
  ['Your own database or app', 'None: it’s yours.', 'Read-only views and the questions your team actually asks, as tools with clear names.'],
  ['Several systems at once', 'Each vendor’s server covers only its own system.', 'One server that answers across your store, CRM and ERP, such as “which open orders belong to customers with overdue invoices?”'],
];

const build = [
  'Tools named for the job. “Find open orders for a customer” rather than a raw API call, so the assistant picks the right one and can’t wander.',
  'Read-only first. Each action it may take, such as creating a draft, is added on purpose after reading works well.',
  'Each person’s own access. People sign in with OAuth and the server acts with their permissions, never a shared admin key.',
  'Hosted where it fits. A remote server works from Claude and from ChatGPT where your plan offers custom connectors; a local one stays on one machine.',
  'Every call logged. What was asked, which tool ran, what it read or changed.',
  'Tested on real questions. A list of the questions your team asks, run before launch and after every change.',
];

const faqs = [
  {
    q: 'What is an MCP server?',
    a: 'A small service that offers an AI assistant a set of tools and data through the Model Context Protocol, an open standard. Any assistant that supports MCP, including Claude and ChatGPT, can then use those tools: look up an order, read a report, create a draft. The server decides what each tool can see and do.',
  },
  {
    q: 'Do I need a custom MCP server if my software already has one?',
    a: 'Often not. If the vendor’s official server does what your team needs, use it. A custom server earns its place when you need several systems answered together, your own rules or saved searches as tools, tighter limits than the vendor’s, or a system with no server at all.',
  },
  {
    q: 'What’s the difference between an MCP server and an API integration?',
    a: 'An API integration moves data between systems on a schedule or trigger, with no one asking. An MCP server waits for an assistant to ask, then answers or acts within the tools it offers. Many businesses need both: the integration keeps systems in sync, and the MCP server lets people ask questions across them.',
  },
  {
    q: 'Does ChatGPT support MCP?',
    a: 'Yes, as custom connectors to remote MCP servers on the ChatGPT plans that offer them. Claude supports MCP in its desktop app, on claude.ai and in Claude Code. A server built to the protocol works with both.',
  },
  {
    q: 'Is it safe to connect AI to our systems?',
    a: 'It’s as safe as the server’s limits. Read-only tools, each person’s own permissions, drafts instead of final records, keys kept on the server and every call logged are how the risk stays small. What the model provider keeps is set by the plan you use, which we check first.',
  },
  {
    q: 'What does it cost?',
    a: `A free 30-minute call first, then a fixed quote for a first server with a handful of tools against one system. I’m based in ${PERSON.location} and work with businesses across the U.S.`,
  },
];

export default function McpServerDevelopmentPage() {
  return (
    <>
      <HomeFollow />
      <JsonLd
        data={graph(
          {
            '@type': 'Service',
            '@id': url('/mcp-server-development/#service'),
            name: 'MCP server development',
            serviceType: 'MCP server development',
            provider: { '@id': ORG_ID },
            url: url('/mcp-server-development/'),
            areaServed: [
              { '@type': 'City', name: 'Los Angeles', containedInPlace: { '@type': 'State', name: 'California' } },
              { '@type': 'Country', name: 'United States' },
            ],
          },
          breadcrumbNode([
            ['Home', '/'],
            ['AI integration', '/ai-integration/'],
            ['MCP server development', '/mcp-server-development/'],
          ]),
          faqNode(faqs)
        )}
      />
      <div className="bg-canvas">
        <PageHero
          back={['/ai-integration/', 'AI integration']}
          eyebrow="MCP · Claude · ChatGPT"
          title={<>Custom MCP servers: your systems, <Accent>inside Claude and ChatGPT.</Accent></>}
          lede="I build MCP servers that let Claude, ChatGPT and other AI assistants read and work with your business systems, through tools named for the job and limited to what each person may see."
          facts={[
            ['Starts with', 'Free 30-minute call'],
            ['Works with', 'Claude, ChatGPT, any MCP client'],
            ['Access', 'Read-only first, per person'],
            ['Based in', PERSON.location],
          ]}
        >
          <PrimaryCta href="/call/">Book a free 30-min call</PrimaryCta>
          <SecondaryCta href="/ai-integration/">AI integration</SecondaryCta>
        </PageHero>

        <Block index="01" label="What it is">
          <Prose
            paragraphs={[
              'The Model Context Protocol (MCP) is an open standard for connecting AI assistants to tools and data. An MCP server is the piece that sits next to your system and offers the assistant a short list of tools, such as “look up an order” or “run this report”, each with clear limits.',
              'Once it’s connected, people ask in plain English inside the assistant they already use, and the answer comes from your own records rather than the model’s memory.',
            ]}
          />
        </Block>

        <Block index="02" label="Use theirs or build one" title={<>Some systems ship their own. <Accent>Many needs don’t fit them.</Accent></>}>
          <DataTable columns={['System', 'Official MCP option', 'When a custom server helps']} rows={systems} />
        </Block>

        <Block index="03" label="How it’s built">
          <NumberedList items={build} tone="accent" />
        </Block>

        <Block index="04" label="Built this way" title={<>On my own product: <Accent>Safe Streets Map.</Accent></>}>
          <p className="text-lg text-muted leading-relaxed max-w-3xl mb-6">
            Safe Streets Map turns California’s public crash records into maps and thousands of pages. I built an MCP server over its
            data with four read-only tools: find a city’s exact name, a city’s totals, the streets with the most crashes, and the
            crashes near a point. Ask Claude “which streets in Pasadena have the most serious crashes?” and the answer comes from the
            records, through tools that can read but never change them.
          </p>
          <p className="text-lg text-ink leading-relaxed max-w-3xl mb-10">
            Swap crash records for your orders, invoices and inventory, and it’s the same build.
          </p>
          <LinkRows
            items={[
              { href: 'https://www.safestreetsmap.com/', tag: 'Live site', title: 'safestreetsmap.com', body: 'The data behind the server, as maps and pages.' },
              { href: '/work/safe-streets-map-crash-data-platform/', tag: 'Case study', title: 'How Safe Streets Map is built' },
            ]}
          />
        </Block>

        <Block index="05" label="When not to">
          <Callout label="Honest scope">
            If your vendor’s official MCP server already answers what your team asks, use it and skip the build. A custom server is
            for questions that cross systems, rules only your business has, or systems nobody has connected yet.
          </Callout>
        </Block>

        <Block index="06" label="Related">
          <LinkRows
            items={[
              { href: '/ai-integration/', tag: 'Service', title: 'AI integration', body: 'Assistants, automations and AI features connected to your tools.' },
              { href: '/api-integration-services/', tag: 'Service', title: 'Custom API integration', body: 'The system-to-system sync an assistant reads from.' },
              { href: '/netsuite/netsuite-ai/', tag: 'Guide', title: 'NetSuite AI: what’s built in, and what’s worth adding' },
            ]}
          />
        </Block>

        <Block index="07" label="Questions">
          <FaqList faqs={faqs} />
        </Block>
      </div>
      <Footer />
    </>
  );
}
