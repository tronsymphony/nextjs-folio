import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import axios from "axios";
import Link from "next/link";

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
      return <img src={node.url} alt={node.alt || ""} />;

    default:
      return <div>Unknown block type: {node.type}</div>;
  }
};

export default async function Home() {
  const articles = await fetchArticles();

  return (
    <>
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
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  try {
    const articles = await fetchArticles();

    return {
      props: {
        articles,
      },
      revalidate: 60, // Regenerate the page every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching articles:", error);

    return {
      props: {
        articles: [],
      },
      revalidate: 60, // Ensure the page regenerates even if there was an error
    };
  }
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
