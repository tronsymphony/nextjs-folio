import styles from "./page.module.css";
import HomeFollow from "../components/home-follow";
import HomeMain from "../components/home-main";

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeFollow></HomeFollow>
      <HomeMain></HomeMain>
    </main>
  );
}
