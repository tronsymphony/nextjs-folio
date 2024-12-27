import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import '../../app/globals.scss';

const fetchArticles = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/articles?limit=10`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYLOAD_API_KEY}`,
      },
    }
  );
  
  return response.data.docs;
};

const RichContentRenderer = ({ node }) => {
  if (!node) return null;

  // Render leaf nodes (text)
  if (node.text) {
    return <span>{node.text}</span>;
  }

  // Render based on node type
  switch (node.type) {
    case "root":
      return (
        <div>
          {node.children?.map((child, index) => (
            <RichContentRenderer key={index} node={child} />
          ))}
        </div>
      );

    case "paragraph":
      return (
        <p>
          {node.children?.map((child, index) => (
            <RichContentRenderer key={index} node={child} />
          ))}
        </p>
      );

    case "heading":
      const HeadingTag = `h${node.level || 1}`; // Default to h1 if no level specified
      return (
        <HeadingTag>
          {node.children?.map((child, index) => (
            <RichContentRenderer key={index} node={child} />
          ))}
        </HeadingTag>
      );

    case "image":
      return (
        <Image
          width={500}
          height={400}
          src={`${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}${node.url}`}
          alt={node.alt || ""}
        />
      );
    default:
      return <div>Unknown block type: {node.type}</div>;
  }
};


export async function getStaticProps() {
  try {
    const articles = await fetchArticles();

    return {
      props: {
        articles: articles || [], // Default to empty array if undefined
      },
      revalidate: 60, // Regenerate the page every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching articles:", error);

    return {
      props: {
        articles: [], // Default to empty array if an error occurs
      },
      revalidate: 60,
    };
  }
}

export default function Blog({ articles = [] }) {

  return (
    <>
      <Head>
        <title>Blog | Full-Stack Developer | Nitya Hoyos</title>
        <meta
          name="description"
          content="Discover insights, guides, and tips on web development by Nitya Hoyos, a skilled Full-Stack Developer based in Los Angeles."
        />
        <meta property="og:title" content="Blog | Nitya Hoyos" />
        <meta
          property="og:description"
          content="Insights on WordPress, Laravel, ReactJS, and more."
        />
        <meta
          property="og:image"
          content={
            articles.length > 0
              ? `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}${articles[0]?.featuredImage?.url}`
              : "/default-blog-image.jpg"
          }
        />
        <meta property="og:url" content="https://casa-dev.com/blog" />
      </Head>
      <HomeFollow />
      <section className="page" data-scroll-section>
        <div className="container">
          <h1 className="title">Blog</h1>
          <span className="subtitle">
            Insights, guides, and tips on web development and design.
          </span>
        </div>
      </section>

      <section className="home_work" data-scroll-section>
        <div className="container">
          {articles?.length > 0 ? (
            <ul className="blogul">
              {articles.map((article) => (
                <li key={article.id}>
                  <Link href={`/blog/${article.slug}`}>
                    <h2>{article.title}</h2>
                  </Link>
                  <div className="link_blog">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="btn_link btn_link--light"
                    >
                      Read More
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No articles found. Please check back later.</p>
          )}
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
