import Link from "next/link";
import styles from "../app/about/about.module.scss";
import Script from "next/script";

export default function About() {
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className={styles.container}>
          <h1 className={styles.title}>About Me</h1>
          <span className={styles.subtitle}>
            Crafting exceptional websites and apps with a creative touch.
          </span>
        </div>
      </section>

      <section className="about_data" data-scroll-section>
        <div className="container">
          <h2 className="title">
            About Me: The Full-Stack Developer Who Rides with Passion
          </h2>
          <p>
            Hi, I’m Nitya Hoyos, a Los Angeles-based full-stack developer with a
            love for coding and cycling. My professional expertise spans
            technologies like WordPress, ReactJS, Laravel, and Shopify. But when
            I’m not crafting custom websites or building seamless digital
            experiences, you’ll likely find me biking along the scenic routes of
            Los Angeles.
          </p>

          <h3>Cycling and Creativity: How Biking Fuels My Work</h3>
          <p>
            Cycling isn’t just a hobby; it’s a source of inspiration and focus.
            The winding trails of Santa Monica or the urban paths of Marina del
            Rey offer more than exercise—they provide clarity. Every pedal
            stroke mirrors the precision I bring to my development projects,
            balancing creativity and technical expertise. Just like navigating a
            challenging route, I approach each project with persistence,
            problem-solving, and attention to detail.
          </p>
          <h3>Why This Matters for You</h3>
          <p>
            Whether you’re looking for a developer who understands the
            intricacies of your digital needs or someone with the discipline and
            creativity to take your ideas to the next level, I bring a unique
            perspective. My ability to find solutions, stay adaptable, and think
            creatively is as much a part of my work ethic as it is my cycling
            routine.
          </p>
          <h3>Let’s Ride the Digital Landscape Together</h3>
          <p>
            If you’re ready to build something extraordinary—whether it’s a
            dynamic website, an intuitive app, or an e-commerce platform—let’s
            connect. With a passion for development and a cyclist’s drive, I’m
            here to deliver solutions that move your business forward.
          </p>
          <div className="cycling-grid">
            <iframe
              height="454"
              width="300"
              frameborder="0"
              allowtransparency="true"
              scrolling="no"
              src="https://www.strava.com/athletes/15797336/latest-rides/594248b42a8f75c469c571310aedb6ddf1691468"
            ></iframe>

            <div
              className="strava-embed-placeholder"
              data-embed-type="activity"
              data-embed-id="13067637439"
              data-style="standard"
              data-from-embed="false"
            ></div>

            {/* Script for Strava Embed */}
            <Script
              src="https://strava-embeds.com/embed.js"
              strategy="afterInteractive"
            />
          </div>
          <h3>Why Work With Me?</h3>
          <p>
            <strong>Comprehensive Expertise:</strong> With a robust skill set
            spanning Shopify Plus, Laravel, WordPress, ReactJS, and NextJS, I
            specialize in crafting modern, high-performing websites and dynamic
            e-commerce platforms. I am well-equipped to deliver results that
            drive growth and make a lasting impact.
          </p>
          <p>
            <strong>Tailored Solutions:</strong> No two businesses are alike,
            and I thrive on creating bespoke solutions tailored to your specific
            goals and vision. Whether designing a site from the ground up or
            enhancing an existing platform, I ensure your digital presence
            stands out in a competitive landscape.
          </p>
          <p>
            <strong>Commitment to Excellence:</strong> My work is defined by
            precision, creativity, and a passion for continuous learning. I aim
            to exceed expectations by crafting digital experiences that are
            visually stunning, highly functional, and deliver measurable
            results.
          </p>

          <h2>Who I Am Outside of Work</h2>
          <p>
            Beyond coding and design, I embrace the vibrant outdoors of Los
            Angeles. Whether biking along coastal trails, catching waves while
            surfing, or hiking scenic paths, these adventures fuel my creativity
            and energize my problem-solving approach. They remind me to approach
            every project with a fresh perspective and an innovative mindset.
          </p>
          <p>
            Are you ready to elevate your online presence? Explore my{" "}
            <Link href="/portfolio">portfolio</Link> to see my work, and let’s
            bring your vision to life. Feel free to{" "}
            <Link href="/contact">get in touch</Link> today to discuss how we
            can collaborate and create something extraordinary!
          </p>
        </div>
      </section>

      <section className="home_skillset" data-scroll-section>
        <div className="container">
          <h3>What I Can Do for You</h3>

          <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/images/design.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">Creative Design</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                <span>
                  I craft user-friendly, visually striking digital experiences
                  that reflect your brand&apos;s identity while ensuring
                  usability and performance.
                </span>
              </div>
            </div>
          </div>

          <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/images/development.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">Full-Stack Development</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                <span>
                  From scalable websites to robust apps, I build solutions using
                  the latest frameworks, including NextJS, ReactJS, and PHP CMS.
                </span>
              </div>
            </div>
          </div>

          <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/images/full-package.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">Complete Solutions</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                <span>
                  I offer end-to-end services, from conceptualization to
                  deployment, combining design and development to deliver
                  impactful projects that truly stand out.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
