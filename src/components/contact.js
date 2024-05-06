'use client'
import styles from "../app/contact/contact.module.scss";
import ContactForm from '../components/ContactForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Contact() {
  return (
    <>
      <section className={styles.page} data-scroll-section>
        <div className={styles.container}>
          <h1 className={styles.title}>Let&apos;s Collaborate</h1>
          <p>
            Whether you&apos;re a startup looking to build your MVP, an established business seeking technical expertise, or a fellow developer in need of collaboration, I&apos;m here to help bring your ideas to life.
          </p>
          <p>Need advice on a technical problem or project scope? Schedule a consultation call with me to discuss your requirements and explore how we can work together.
          </p>
        </div>
      </section>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <section className={styles.pagedForm} data-scroll-section>
          <div className="container">
            <ContactForm></ContactForm>
          </div>
        </section>
      </ThemeProvider>
    </>
  );
}
