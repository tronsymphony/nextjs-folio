import Link from "next/link";
import styles from "../app/about/about.module.scss";

export default function About() {
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className={styles.container}>
          <h1 className={styles.title}>About</h1>
          <span className={styles.subtitle}>
            Creative web and app developer with a flair for design.
          </span>
        </div>
      </section>
      <section className="about_data" data-scroll-section>
        <div className="container">
          <h2 className="title">
            Meet Nitya Hoyos: Your Full-Stack Developer and Web Designer in Los
            Angeles
          </h2>
          <p>
            Welcome to my professional portfolio! I&apos;m Nitya Hoyos, a Full-Stack
            Developer and Web Designer based in the vibrant city of Los Angeles.
            With over a decade of experience, I specialize in transforming the
            digital landscape by creating bespoke e-commerce solutions,
            innovative apps, and dynamic websites.
          </p>
          <h3>Why Choose Me?</h3>
          <p>
            Expertise Across Technologies: I&apos;m proficient in a wide range of
            technologies, including Shopify Plus, Laravel, WordPress, ReactJS,
            and NextJS. This diverse skill set ensures that I can handle every
            project, from simple websites to complex e-commerce platforms, with
            the utmost professionalism and technical acumen.
          </p>
          <p>
            Customized Solutions: I understand that each business is unique,
            which is why I offer tailored solutions to align with your specific
            needs. Whether you&apos;re looking to build a new website from scratch or
            optimize an existing platform, my bespoke services are designed to
            help your business grow and succeed.
          </p>
          <p>
            Passion for Excellence: Driven by a passion for innovation and
            excellence, I&apos;m committed to delivering high-quality work that
            exceeds your expectations. My attention to detail and dedication to
            continuous learning make me a standout professional in the field of
            web development and design.
          </p>
          <h2>A Bit About Me</h2>
          <p>
            When I&apos;m not coding or designing, you can find me exploring the
            beautiful outdoors of Los Angeles. I love biking, surfing, and
            hiking, which not only keeps me active but also inspires my
            creativity and problem-solving skills.
          </p>
          <p>
            Feel free to explore my portfolio and get in touch if you have any
            questions or if you’re ready to start your next project. Let&apos;s
            elevate your business together!
          </p>
        </div>
      </section>
      <section className="home_skillset" data-scroll-section>
        <div className="container">
          <h4>I can help you with ...</h4>
          <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-21ec0b7/www.aaaaa.com/app/uploads/2022/09/image-abouthover-2.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">Design</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                <span>
                  With a proven history in website design, I craft robust,
                  user-friendly digital solutions, focusing on development
                </span>
              </div>
            </div>
          </div>
          <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-21ec0b7/www.aaaaa.com/app/uploads/2022/09/image-abouthover-3.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">Development</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                {" "}
                <span>
                  I build scalable websites from scratch that fit seamlessly
                  with design. My focus is on PHP CMS, NextJS, React Phone Apps
                  or Shopify.
                </span>
              </div>
            </div>
          </div>
          <div
            data-scroll=""
            className="hover-reveal-effect canvas-reveal cfadeinup is-inview"
            data-src="/ChEvwayTHZmZJUAdsUNMLXuXZdBprFoQ/assets/images/optimized/rev-21ec0b7/www.aaaaa.com/app/uploads/2022/09/image-abouthover-4.jpg"
          >
            <div className="row hover-row">
              <div className="col-xl-5 col-lg-6 desc-title">
                <h3 className="h2">The full package</h3>
              </div>
              <div className="col-xl-5 col-lg-6 desc-text">
                {" "}
                <span>
                  A complete website from concept to implementation, that&apos;s
                  what makes me stand out. My great sense for design and my
                  development skills enable me to create kick-ass projects.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
