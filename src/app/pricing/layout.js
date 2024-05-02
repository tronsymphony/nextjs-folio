import { Inter } from "next/font/google";

// import styles from "./page.module.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pricing Nitya Hoyos | Full-Stack Developer | WordPress, Laravel, ReactJS, NodeJS, Shopify | 10+ Years Experience",
  description: "Experienced Full-Stack Freelance Developer proficient in WordPress, Laravel, ReactJS, NodeJS, and Shopify. Offering top-notch solutions tailored to your business needs. Available for hire or contract work. Let's bring your ideas to life and create exceptional web experiences together.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
