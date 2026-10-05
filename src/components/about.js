import Script from "next/script";
import Expertise from "./Expertise";
import { Accent, ArrowLink, PrimaryCta, SecondaryCta } from "./ui/Cta";
import { Block, NumberedList, PageHero, Prose } from "./ui/Page";
import { PERSON } from "../lib/site";

const howIWork = [
  "One engineer from the first call to launch. The person you talk to is the person writing the code.",
  "Alongside your NetSuite partner or agency: they own configuration and campaigns, I own the integrations and the applications.",
  "Small, fixed-scope steps first, so you can judge the work before committing to more.",
  "Written plans and documentation you keep, whoever maintains the code next.",
];

export default function About() {
  return (
    <div className="bg-ink">
      <PageHero
        back={["/", "Home"]}
        eyebrow={PERSON.location}
        title={
          <>
            {PERSON.name}, software engineer. <Accent>NetSuite, meet the front end.</Accent>
          </>
        }
        lede={`${PERSON.yearsExperience} years of software engineering. Today I focus on Oracle NetSuite and the applications built on it, and I build and run my own product, Safe Streets Map.`}
        facts={[
          ["Experience", `${PERSON.yearsExperience} years`],
          ["Focus", "NetSuite, front ends, product development"],
          ["Own product", "Safe Streets Map"],
          ["Based in", PERSON.location],
        ]}
      >
        <PrimaryCta href="/call/">Book a 20-min call</PrimaryCta>
        <SecondaryCta href="/work/">See the work</SecondaryCta>
      </PageHero>

      <Block index="01" label="About me">
        <Prose
          paragraphs={[
            "I connect Oracle NetSuite to storefronts, 3PLs and CRMs, and build the customer portals and showrooms that run on its data, such as the Total Warehouse showroom, where equipment buyers browse live ERP inventory and request quotes.",
            "I also build products end to end. Safe Streets Map is mine: free California street-safety maps built from state crash records, with more than 1,500 pages generated from the data, live weather and road conditions, a ride planner, a tool that checks a GPX ride against crash records in the browser, and a 3D riding simulator. Building it has meant data pipelines, map tiles, government APIs, search, accessibility and privacy decisions, the same problems clients bring me.",
            "I have also built Shopify storefronts, WordPress sites, and React and Angular applications, and I am comfortable picking up an existing codebase and leaving it better documented than I found it.",
          ]}
        />
      </Block>

      <Block index="02" label="What I work with" title="Skills, from the products I've built" wide>
        <Expertise />
      </Block>

      <Block index="03" label="How I work">
        <NumberedList items={howIWork} tone="accent" />
      </Block>

      <Block index="04" label="Outside work">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.02] tracking-[-0.035em] mb-6">
              Most of my thinking happens <Accent>on a bike.</Accent>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              I ride the roads and climbs around Los Angeles; my latest rides are here. Cycling is also one of the three ways of
              getting around that Safe Streets Map covers, along with walking and motorcycling.
            </p>
            <ArrowLink href="/work/safe-streets-map-crash-data-platform/">How Safe Streets Map is built</ArrowLink>
          </div>
          <div className="rounded-3xl overflow-hidden border border-line bg-ink-2">
            <iframe
              title="Latest rides on Strava"
              height="454"
              width="100%"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
              src="https://www.strava.com/athletes/15797336/latest-rides/594248b42a8f75c469c571310aedb6ddf1691468"
              className="block w-full h-[454px]"
            />
            <Script src="https://strava-embeds.com/embed.js" strategy="lazyOnload" />
          </div>
        </div>
      </Block>
    </div>
  );
}
