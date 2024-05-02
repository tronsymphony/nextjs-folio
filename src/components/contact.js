import Link from "next/link";
import styles from "../app/about/about.module.css";

export default function About() {
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className="container">
          <h1 className={styles.title}>About</h1>
          <p>
            Welcome to my personal space on the web! I'm Nitya Hoyos, a
            dedicated and passionate full-stack web developer based in the
            vibrant city of Los Angeles. With a robust 8 years of experience in
            the tech industry, I specialize in creating seamless and dynamic
            digital experiences from the ground up.
          </p>
          <h2>My Journey</h2>
          <p>
            Born and raised in Los Angeles, I have always been fascinated by the
            endless possibilities that coding and technology present. My career
            began straight out of college, where I dived deep into both
            front-end and back-end technologies. Over the years, I've had the
            privilege of working on a wide range of projects, from innovative
            startup websites to complex enterprise solutions.
          </p>
          <h2>What I Do</h2>
          <p>
            As a solo developer, I handle every aspect of the development
            process, ensuring that every line of code not only meets but exceeds
            the expectations of my clients and their users. My expertise spans a
            variety of programming languages and frameworks, including but not
            limited to JavaScript, Python, React, Node.js, and Django. I am
            deeply committed to leveraging the latest technologies to deliver
            responsive, user-friendly, and efficient applications.
          </p>
          <h2>Beyond Coding</h2>
          <p>
            {" "}
            When I'm not glued to my computer screen, you'll likely find me
            exploring the lush trails around Los Angeles on my bike. Cycling is
            not just a hobby—it's a way for me to recharge, find inspiration,
            and connect with nature.
          </p>

          <h2>Let's Connect</h2>
          <p>
            Whether you're looking to build a website from scratch or seeking
            expertise to enhance your current digital assets, I'm here to help.
            Let's create something amazing together! Feel free to reach out and
            discuss your project or just connect to share ideas.
          </p>

          <p>
            Thank you for stopping by, and I look forward to collaborating with
            you!
          </p>
        </div>
      </section>
    </>
  );
}
