// Security guides for apps built with AI coding tools, rendered at
// /ai-app-audit/[guide]/. Each answers one question people search before
// launching, with checks a founder can run themselves, and ends with the audit.
//
// Same rule as netsuiteTopics.js: the quality gate at the bottom throws at
// build time if a *published* guide is thin. Only checks you have verified
// against the tool's own documentation belong here.

export const appAuditGuides = [
  {
    slug: 'supabase-row-level-security',
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'Supabase Row Level Security: Check Your App’s Data Is Private',
    description:
      'How to check that Supabase row level security actually protects your app’s data: test tables with the public anon key, spot policies that allow everything, and fix views, storage and functions that skip RLS.',
    h1: 'Supabase row level security: is your data really private?',
    lede:
      'Every Supabase app ships its anon key to the browser. That is by design: the key only identifies the project, and row level security (RLS) policies decide what each user can read and write. If a table has RLS off, or a policy that allows everything, anyone with the key can read the whole table.',
    intro: [
      'Supabase exposes your tables through an API that anyone can call with the project URL and anon key, both of which are visible in your app’s JavaScript. The database decides what each request may see by checking RLS policies against the user’s login. With RLS enabled and no policies, a table returns nothing. With RLS disabled, it returns everything.',
      'Apps built quickly, by hand or with AI tools, tend to fail in the same few ways: a table created in SQL without RLS turned on, a policy written as using (true) to make an error go away, an update policy without a with check clause so users can reassign rows to someone else, or a view that reads a protected table with the view owner’s rights. Each of these passes every test where you are logged in as yourself and only shows up when someone else asks for your data.',
      'The checks below need only the project URL and anon key from your app and a terminal. Run them against a staging copy if you have one.',
    ],
    checks: [
      {
        title: 'Every table in the public schema has RLS enabled',
        how: 'Open the Security Advisor in the Supabase dashboard, or run: select tablename, rowsecurity from pg_tables where schemaname = \'public\'; Any row with rowsecurity false is readable and writable through the API.',
        fix: 'alter table public.<table> enable row level security; then add policies for exactly what each role needs.',
      },
      {
        title: 'Logged-out requests return nothing private',
        how: 'curl "https://<project>.supabase.co/rest/v1/<table>?select=*" -H "apikey: <anon key>". If private rows come back, anyone on the internet can read them.',
        fix: 'Write policies with to authenticated and a condition on the user, never using (true) on private data.',
      },
      {
        title: 'Users can only read their own rows',
        how: 'Sign in as a second test user and request the first user’s rows by ID. A policy that checks only that the user is logged in lets every user read every row.',
        fix: 'Use a condition such as (select auth.uid()) = user_id in the using clause.',
      },
      {
        title: 'Update and insert policies have with check',
        how: 'As a test user, try updating one of your rows to set user_id to another user’s ID. If it succeeds, users can plant rows in other accounts.',
        fix: 'Add with check ((select auth.uid()) = user_id) to insert and update policies.',
      },
      {
        title: 'Views and functions don’t bypass RLS',
        how: 'List views in the public schema. Views run with their owner’s rights by default, so a view over a protected table can expose it. Check functions marked security definer that are callable through /rest/v1/rpc.',
        fix: 'Create views with (security_invoker = true) on Postgres 15 or later, or move them out of the exposed schema; keep security definer functions out of it too.',
      },
      {
        title: 'Storage buckets match what they hold',
        how: 'Check which buckets are public. Files in a public bucket can be fetched by anyone with the URL, whatever your app’s login says.',
        fix: 'Make private buckets private and add policies on storage.objects that check the user.',
      },
      {
        title: 'The service role key is not in the browser',
        how: 'Search your built JavaScript and environment files for service_role or the key itself. Environment variables prefixed with VITE_ or NEXT_PUBLIC_ are bundled into the browser code.',
        fix: 'Use the service role key only in server code or edge functions, and rotate it if it was ever shipped.',
      },
    ],
    codeSnippet: `alter table public.notes enable row level security;

create policy "Owners read their notes" on public.notes
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Owners add their notes" on public.notes
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Owners update their notes" on public.notes
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);`,
    whenToGetHelp:
      'If several tables are shared between users (teams, organizations, invites, admin roles), policies get harder to reason about and easier to get subtly wrong. That is where a second pair of eyes pays for itself.',
    faqs: [
      {
        q: 'Is it safe that my Supabase anon key is public?',
        a: 'Yes, as long as RLS is enabled on every exposed table and the policies are right. The anon key is designed to be public; RLS is what protects the data. The service role key bypasses RLS and must never be public.',
      },
      {
        q: 'How do I know if RLS is enabled on my Supabase tables?',
        a: 'The Security Advisor in the Supabase dashboard flags tables without RLS. You can also query pg_tables for the rowsecurity column in the public schema.',
      },
      {
        q: 'Why does my app break when I enable RLS?',
        a: 'With RLS on and no policies, every query returns nothing. Add a policy for each action the app needs (select, insert, update, delete), limited to the rows the user should reach, rather than turning RLS back off.',
      },
    ],
    related: ['lovable-app-security', 'ai-built-app-launch-checklist'],
  },
  {
    slug: 'lovable-app-security',
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'Is My Lovable App Secure? A Pre-Launch Checklist',
    description:
      'A security checklist for apps built with Lovable before launch or taking payments: Supabase row level security, exposed keys, admin pages, edge functions, payments and AI API costs.',
    h1: 'Is my Lovable app secure? What to check before launch',
    lede:
      'Lovable apps are usually a React front end on a Supabase backend. The front end can look finished while the backend lets anyone read or change data, because the browser only hides what the database still serves. These are the checks to run before real users and payments arrive.',
    intro: [
      'An AI app builder writes code that makes the feature work for the person testing it. Security problems rarely show up in that test, because you are logged in as yourself and only click what the interface offers. An attacker does neither: they read your JavaScript, find the Supabase URL and anon key, and call the API directly.',
      'Most of the serious problems in Lovable apps sit in a few places: Supabase tables without row level security, admin features protected only by hiding a button, edge functions that trust whatever user ID the browser sends, and paid APIs (AI models, email, SMS) that anyone can call in a loop on your bill. None of them are hard to fix once found.',
      'You can run the checks below yourself with a browser’s developer tools and a terminal. Do it on a copy of the app with test data if you can. When you ask the AI to fix something, test the fix the same way, as a second user or with no login at all: the AI reports success when the feature works, not when the data is protected.',
    ],
    checks: [
      {
        title: 'Row level security on every table',
        how: 'In Supabase, open the Security Advisor and look for tables without RLS. Then request a private table with only the anon key from your app’s code (see the Supabase RLS guide). If rows come back, they are public.',
        fix: 'Enable RLS and write policies tied to the logged-in user. Ask the AI to write them, then test them as a second user.',
      },
      {
        title: 'Admin pages check the role on the server',
        how: 'Log in as a normal user and call the queries the admin page makes (copy them from the Network tab). If they return data, the admin page is only hidden, not protected.',
        fix: 'Store roles in a table users cannot edit, and check them in RLS policies or edge functions, not only in React.',
      },
      {
        title: 'No secret keys in the browser bundle',
        how: 'Open the deployed site, view the JavaScript files in developer tools and search for sk_live, sk_test, service_role, and the names of other services you use.',
        fix: 'Move secret keys into Supabase edge function secrets, call the service from the edge function, and rotate any key that was exposed.',
      },
      {
        title: 'Edge functions know who is calling',
        how: 'Read each edge function. If it takes a user ID or email from the request body and acts on it, any user can act as any other user.',
        fix: 'Read the user from the JWT in the Authorization header with the Supabase client, and ignore IDs sent by the browser.',
      },
      {
        title: 'Payments are confirmed by Stripe, not the browser',
        how: 'Check how the app decides a user has paid. If the browser tells the database “paid” after checkout, a user can send that message without paying.',
        fix: 'Grant access from a Stripe webhook handled in an edge function that verifies the Stripe signature.',
      },
      {
        title: 'Paid APIs have limits',
        how: 'Find the functions that call AI models, email or SMS. Check whether a logged-out user can call them, and whether anything stops one user calling them thousands of times.',
        fix: 'Require login, add a per-user rate limit or daily quota, and set spending limits in the provider’s dashboard.',
      },
    ],
    whenToGetHelp:
      'If the app has several user roles, team accounts, payments or personal data, or you are about to announce it, get the backend reviewed before launch; fixing a leak after users find it costs far more.',
    faqs: [
      {
        q: 'Are Lovable apps secure?',
        a: 'They can be. The generated code is a normal React and Supabase app, so its security depends on the same things as any app: row level security, where keys live, and server-side checks. The common problems come from those being skipped, not from Lovable itself.',
      },
      {
        q: 'Can people see my Supabase key in a Lovable app?',
        a: 'Yes, the anon key is always in the browser, and that is expected. It is only safe when row level security is enabled with correct policies on every table. A service role key or any secret API key in the browser is a real leak.',
      },
      {
        q: 'Do I need a security review before launching a Lovable app?',
        a: 'If it stores other people’s data or takes payments, a review before launch is the cheapest time to find problems. Run the checks on this page first; they catch the most common issues.',
      },
    ],
    related: ['supabase-row-level-security', 'ai-built-app-launch-checklist'],
  },
  {
    slug: 'ai-built-app-launch-checklist',
    status: 'published',
    updatedAt: '2026-10-05',
    title: 'Security Checklist for Apps Built with Cursor, Bolt or Claude Code',
    description:
      'What to check before launching an app built with Cursor, Bolt, Replit, v0 or Claude Code: authorization on every route, secrets, Stripe webhooks, rate limits, dependencies, backups and monitoring.',
    h1: 'Launching an app built with AI? The security checklist',
    lede:
      'AI coding tools are good at making features work and less reliable at the parts nobody sees: who is allowed to do what, which secrets reach the browser, and what happens when someone calls your API directly. This checklist covers the problems found most often in Next.js and Node apps written with Cursor, Bolt, Replit, v0 or Claude Code.',
    intro: [
      'The most common serious bug in AI-written backends is missing authorization: an API route or server action checks that someone is logged in, but not that the record they ask for is theirs. Change the ID in the request and you get another user’s data. It never shows up when you click through your own app, which is why it survives to production.',
      'The next most common are secrets in the wrong place and trust in the browser. Environment variables with a public prefix are compiled into the JavaScript bundle. Prices, roles and payment status sent from the browser can be edited by the user. Webhooks accepted without checking their signature can be faked.',
      'The rest of the list is about running the app for real: rate limits on logins and expensive endpoints, dependencies with known vulnerabilities, backups you have restored at least once, and error monitoring so you hear about failures before your users tell you.',
    ],
    checks: [
      {
        title: 'Every route checks ownership, not just login',
        how: 'For each API route and server action that reads or changes a record, change the record ID in the request to one belonging to another test user. You should get a 403 or 404, not their data.',
        fix: 'Look up the record with both its ID and the current user’s ID (or organization), on the server, in every handler.',
      },
      {
        title: 'Server actions are treated as public endpoints',
        how: 'In Next.js, every exported server action can be called directly, not only from the form that uses it. Check each one for its own authentication and authorization.',
        fix: 'Start every server action by reading the session and checking permissions, the same as an API route.',
      },
      {
        title: 'No secrets in the browser or the repo',
        how: 'Search for keys in variables prefixed NEXT_PUBLIC_ or VITE_, in the built JavaScript, and in git history (git log -p | grep -i "sk_live\\|secret\\|password").',
        fix: 'Keep secrets in server-only environment variables; rotate anything that was committed or shipped, since removing it from the code does not remove it from history.',
      },
      {
        title: 'Stripe webhooks are verified and prices come from the server',
        how: 'Check that the webhook handler verifies the Stripe-Signature header against the raw request body, and that checkout sessions are created with price IDs chosen on the server.',
        fix: 'Use stripe.webhooks.constructEvent with the raw body and your webhook secret; never accept an amount or price from the client.',
      },
      {
        title: 'Logins and expensive endpoints are rate limited',
        how: 'Send the same login, password reset or AI request 100 times in a minute. If nothing slows you down, nothing slows an attacker down either.',
        fix: 'Add rate limits per IP and per user, and spending caps at the AI or email provider.',
      },
      {
        title: 'Input is validated on the server',
        how: 'Send unexpected types, very long strings and extra fields to your API. Look for errors that leak stack traces, and for fields like role or isAdmin that get saved because the handler spreads the whole body into the database.',
        fix: 'Validate request bodies against a schema and copy only the fields you expect.',
      },
      {
        title: 'Dependencies, backups and monitoring',
        how: 'Run npm audit, check that database backups are on, try restoring one, and confirm errors in production reach you.',
        fix: 'Update or replace vulnerable packages, schedule backups with a tested restore, and add error monitoring before launch.',
      },
    ],
    whenToGetHelp:
      'If the app handles payments, personal or health data, or other companies’ data, or you are raising money or selling the business, have the code reviewed by someone who did not write it, or prompt it.',
    faqs: [
      {
        q: 'Is code written by Cursor or Claude Code secure?',
        a: 'It is as secure as the review it gets. AI tools write working code quickly, but they follow your prompts, and authorization, secrets handling and abuse limits are easy to leave out of a prompt. Treat AI-written code like code from a fast new hire: review it before it handles real users.',
      },
      {
        q: 'What is the most common security bug in AI-built apps?',
        a: 'Missing authorization: endpoints that check a user is logged in but not that the requested record belongs to them, so changing an ID in the request exposes other users’ data.',
      },
      {
        q: 'Can I use AI to fix the security issues?',
        a: 'Often, yes, once you know exactly what is wrong and where. The hard part is finding the issues; a clear list with file and line lets you or the AI fix them reliably.',
      },
    ],
    related: ['supabase-row-level-security', 'lovable-app-security'],
  },
];

// ---------------------------------------------------------------------------
// Quality gate. Runs when this module is imported during the build.

const MIN_INTRO_CHARS = 900;

function problemsWith(guide) {
  const problems = [];
  const introLength = (guide.intro || []).join(' ').length;
  if (!guide.lede || guide.lede.split(/\s+/).length > 70) problems.push('lede must exist and stay under ~60 words');
  if (introLength < MIN_INTRO_CHARS) problems.push(`intro is ${introLength} chars; needs ${MIN_INTRO_CHARS}+`);
  if ((guide.checks || []).length < 5) problems.push('needs at least 5 checks');
  if ((guide.checks || []).some((c) => !c.how?.trim() || !c.fix?.trim())) problems.push('every check needs how and fix');
  if (!guide.whenToGetHelp?.trim()) problems.push('whenToGetHelp is required');
  if ((guide.faqs || []).length < 3) problems.push('needs at least 3 faqs');
  return problems;
}

for (const guide of appAuditGuides) {
  if (guide.status !== 'published') continue;
  const problems = problemsWith(guide);
  if (problems.length) {
    throw new Error(`App audit guide "${guide.slug}" is too thin to publish:\n  - ${problems.join('\n  - ')}`);
  }
}

export const publishedGuides = () => appAuditGuides.filter((g) => g.status === 'published');

export const getGuide = (slug) => publishedGuides().find((g) => g.slug === slug);
