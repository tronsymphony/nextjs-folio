'use client'
import Link from "next/link";
import styles from "../app/about/about.module.css";
import ContactForm from '../components/ContactForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function About() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <section className={styles.page} data-scroll-section>
          <div className="container">
            <h1 className={styles.title}>Let&apos;s Collaborate</h1>
            <p>
              Whether you&apos;re a startup looking to build your MVP, an established business seeking technical expertise, or a fellow developer in need of collaboration, I&apos;m here to help bring your ideas to life.
            </p>
            <p>Need advice on a technical problem or project scope? Schedule a consultation call with me to discuss your requirements and explore how we can work together.
            </p>
            <ContactForm></ContactForm>
          </div>
        </section>
      </ThemeProvider>
    </>
  );
}
