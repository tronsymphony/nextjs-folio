// app/blog/page.js
import Link from "next/link";
import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";

const blogs = [
    {
      slug: "cycling-and-coding-insights-from-my-strava-journey",
      title: "Cycling and Coding: Insights from My Strava Journey",
      summary:
        "Explore how my Strava cycling adventures fuel creativity and productivity in my work as a full-stack developer.",
    },
  ];
  
export default function Home() {
  return (
    <>
      <HomeFollow />
      <section className="page" data-scroll-section>
        <div className="container">
          <h1 className="title">Blog</h1>
          <span className="subtitle">Insights, guides, and tips on web development and design.</span>
        </div>
      </section>

      <section className="home_work" data-scroll-section>
        <div className="container">
          <ul className="blogul">
            {blogs.map((blog) => (
              <li key={blog.slug}>
                <Link href={`/blog/${blog.slug}`}>
                  <h2>{blog.title}</h2>
                </Link>
                <p>{blog.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}

export const metadata = {
  metadataBase: new URL("https://casa-dev.com"),
  alternates: {
    canonical: "/blog",
    languages: {
      "en-US": "/en-US",
    },
  },
  title:
    "Blog | Full-Stack Developer | WordPress, Laravel, ReactJS, PHP, NodeJS, Shopify | Santa Monica & Los Angeles",
  description:
    "Explore the Blog of Nitya Hoyos, a Los Angeles-based Full-Stack Developer. Skilled in WordPress, Laravel, ReactJS, NodeJS, and Shopify, I craft bespoke digital solutions to help businesses grow. Discover top-tier projects and innovative web solutions designed for success.",
};
