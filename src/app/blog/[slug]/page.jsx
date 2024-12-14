import { notFound } from "next/navigation";
import Footer from "../../../components/footer";
import HomeFollow from "../../../components/home-follow";

const blogContent = {
  "cycling-and-coding-insights-from-my-strava-journey": {
    title: "Cycling and Coding: Insights from My Strava Journey",
    content: `
      <p>As a full-stack developer based in Los Angeles, I spend most of my time immersed in coding, design, and problem-solving. But when I'm not crafting digital solutions, you’ll find me on my bike, exploring the scenic routes of LA and beyond. My passion for cycling isn’t just about staying active—it’s a vital part of my life that fuels my creativity and productivity.</p>
      
      <h3>Why Cycling?</h3>
      <p>Cycling offers a unique blend of physical activity, mental clarity, and connection with the outdoors. Whether it’s tackling the hills of Santa Monica or cruising along the beach paths of Marina del Rey, each ride is an opportunity to recharge and reset. The rhythmic motion of pedaling mirrors the focus and persistence I bring to my work as a developer.</p>
      
      <h3>Tracking My Rides on Strava</h3>
      <p>Strava has been my go-to platform for tracking rides, analyzing performance, and connecting with a vibrant community of fellow cyclists. You can follow my cycling journey on <a href="https://www.strava.com/athletes/15797336" target="_blank" rel="noreferrer">Strava</a> to see some of my favorite routes, achievements, and insights from the road.</p>
      
      <iframe height="454" width="300" frameborder="0" allowtransparency="true" scrolling="no" src="https://www.strava.com/athletes/15797336/latest-rides/594248b42a8f75c469c571310aedb6ddf1691468"></iframe>

      
      <h3>How Cycling Fuels My Work</h3>
      <p>Cycling and coding might seem worlds apart, but they share common threads. Both require focus, discipline, and the ability to tackle challenges head-on. Some of my best ideas come to me during rides, inspired by the rhythm of the road and the beauty of the landscapes. These moments of clarity often translate into innovative solutions for my projects.</p>
      
      <h3>Join Me on the Journey</h3>
      <p>Whether you’re a fellow cyclist or a business owner looking to elevate your digital presence, I’d love to connect. Explore my <a href="/portfolio">portfolio</a> to see how I combine technical expertise with creative design, and feel free to <a href="/contact">get in touch</a> to collaborate on your next project.</p>
    `,
  },
};


// Generate static params for pre-rendering
export function generateStaticParams() {
  return Object.keys(blogContent).map((slug) => ({ slug }));
}

export default function BlogPage({ params }) {
  const { slug } = params;
  const blog = blogContent[slug];

  if (!blog) {
    notFound();
  }

  return (
    <>
      <HomeFollow />
      <section className="page" data-scroll-section>
        <div className="container">
          <h1 className="title">{blog.title}</h1>
          <span className="subtitle">
            Insights, guides, and tips on web development and design.
          </span>
        </div>
      </section>

      <section className="home_work" data-scroll-section>
        <div className="container">
          <article dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </section>
      <Footer />
    </>
  );
}

export const metadata = {
  metadataBase: new URL("https://casa-dev.com"),
  alternates: {
    canonical: "/blog/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title:
    "Blog | Full-Stack Developer | WordPress, Laravel, ReactJS, PHP, NodeJS, Shopify | Santa Monica & Los Angeles",
  description:
    "Explore the Blog of Nitya Hoyos, a Los Angeles-based Full-Stack Developer. Skilled in WordPress, Laravel, ReactJS, NodeJS, and Shopify, I craft bespoke digital solutions to help businesses grow. Discover top-tier projects and innovative web solutions designed for success.",
};
