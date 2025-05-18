import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import RichContentRenderer from "../../components/RichContentRenderer";
import '../../app/globals.scss';
import Image from "next/image";
import Head from "next/head";

// Fetch article by slug
const fetchArticle = async (slug) => {
    const decodedSlug = decodeURIComponent(slug);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/articles?where[slug][equals]=${decodedSlug}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PAYLOAD_API_KEY}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch article");
    }

    const data = await response.json();
    return data.docs[0] || null;
};

// getStaticPaths: Define which pages to generate at build time
export async function getStaticPaths() {
    try {
      const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL;
      const API_KEY = process.env.PAYLOAD_API_KEY;
      
      // Verify environment variables exist
      if (!API_URL || !API_KEY) {
        console.error("Missing required environment variables");
        return { paths: [], fallback: 'blocking' };
      }
      
      const response = await fetch(
        `${API_URL}/articles?limit=50`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          // Add timeout to prevent hanging
          timeout: 10000
        }
      );
  
      if (!response.ok) {
        console.error("Error fetching articles:", response.statusText);
        return { paths: [], fallback: 'blocking' };
      }
  
      const data = await response.json();
      const articles = data.docs || [];
  
      // Filter out any articles with missing or invalid slugs
      const paths = articles
        .filter(article => article.slug && typeof article.slug === 'string')
        .map(article => ({
          params: { slug: article.slug },
        }));
  
      return {
        paths,
        // Using 'blocking' means pages not generated at build time will be 
        // generated on-demand and cached for future requests
        fallback: 'blocking', 
      };
    } catch (error) {
      console.error("Error in getStaticPaths:", error);
      // Return an empty paths array with blocking fallback to
      // handle errors gracefully without breaking the build
      return { 
        paths: [],
        fallback: 'blocking'
      };
    }
  }

// getStaticProps: Fetch data for each page
export async function getStaticProps({ params }) {
    try {
      // Safely access the slug parameter
      const slug = params?.slug;
      
      // Handle case where slug is missing
      if (!slug) {
        return { 
          notFound: true 
        };
      }
      
      const article = await fetchArticle(slug);
  
      // Handle case where article is not found
      if (!article) {
        return { 
          notFound: true 
        };
      }
  
      return {
        props: {
          article,
        },
        // revalidate should be a property of the returned object, not inside props
        revalidate: 60,
      };
    } catch (error) {
      // Catch any errors during the process
      console.error('Error in getStaticProps:', error);
      
      return {
        notFound: true,
        // Alternatively, you could return a custom error page:
        // props: { error: true, message: 'Something went wrong' },
      };
    }
  }

// Blog Page Component
export default function BlogPage({ article }) {
    // console.log(article);

    return (
        <>
            <Head>
                <title>{article.title} | Safe Streets Map Blog</title>
                <meta name="description" content={article.excerpt || "Discover insights and tips on web development and design."} />
                <meta name="author" content="Casa Dev" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.excerpt || "A helpful article from the Safe Streets Map blog."} />
                <meta property="og:type" content="article" />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${article.featuredImage?.url}`} />
                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/articles/${article.slug}`} />
                <meta property="og:site_name" content="Safe Streets Map" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={article.excerpt || "A curated article from the Safe Streets Map blog."} />
                <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${article.featuredImage?.url}`} />
            </Head>

            <HomeFollow />

            <section className="page" data-scroll-section>
                <div className="container">
                    {article.featuredImage && (
                        <div className="blogpage-image-wrapper">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/${article.featuredImage.url}`.replace(/\/\//g, '/')}
                                alt={article.featuredImage.alt || article.title}
                                className="blogpage-image"
                                width={900}
                                height={400}
                                priority
                            />
                        </div>
                    )}
                    <h1 className="title blog-title">{article.title}</h1>
                </div>
            </section>

            <section className="blog-content" data-scroll-section>
                <div className="container">
                    <p className="blog-meta">
                        Published on:{" "}
                        <time dateTime={article.publishedDate}>
                            {new Date(article.publishedDate).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    </p>

                    {article.content.map((block, index) => {
                        switch (block.blockType) {
                            case "wysiwyg":
                                return (
                                    <div key={index} className="blog-content__block">
                                        {RichContentRenderer(block.content.root)}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </section>

            <Footer />
        </>
    );
}
