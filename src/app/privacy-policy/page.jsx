import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";

export default function PrivacyPolicy() {
  return (
    <>
      <HomeFollow />

      <section className="page" data-scroll-section>
        <div className="container">
          <h1 className="title">Privacy Policy</h1>
          <p className="subtitle">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      <section className="about_data" data-scroll-section>
        <div className="container">
          <h2 className="title">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email address, phone number, and other details you provide
            when interacting with our site. Additionally, we may gather non-personal data such as browser type, IP address, and cookies
            to improve your browsing experience.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            The information we collect is used to:
          </p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Respond to your inquiries</li>
            <li>Send updates or promotional materials</li>
            <li>Ensure the security of our website</li>
          </ul>

          <h2>Protecting Your Information</h2>
          <p>
            We take your privacy seriously and implement industry-standard measures to safeguard your data. However, please note that no
            method of online transmission or storage is completely secure.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to request access, correction, or deletion of your personal information. To exercise these rights, please 
            <a href="/contact">contact us</a>.
          </p>

          <h2>Updates to This Policy</h2>
          <p>
            This Privacy Policy may be updated periodically. Please revisit this page to stay informed about any changes.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export const metadata = {
  metadataBase: new URL("https://casa-dev.com"),
  alternates: {
    canonical: "/privacy-policy",
    languages: {
      "en-US": "/en-US",
    },
  },
  title: "Privacy Policy | Casa Dev",
  description:
    "Learn how Casa Dev protects your privacy. Read our Privacy Policy to understand the information we collect, how we use it, and the measures we take to safeguard your data.",
  keywords:
    "privacy policy, data protection, Casa Dev privacy policy, information usage, user data privacy, Casa Dev",
};
