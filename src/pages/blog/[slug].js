import Footer from "../../components/footer";
import HomeFollow from "../../components/home-follow";
import RichContentRenderer from "../../components/RichContentRenderer";
// import axios from "axios";
import '../../app/globals.scss';
import Image from "next/image";

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
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_API_URL}/articles?limit=50`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PAYLOAD_API_KEY}`,
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        console.error("Error fetching articles:", response.statusText);
        return { paths: [], fallback: false };
    }

    const data = await response.json();
    const articles = data.docs || [];

    // Generate paths for all article slugs
    const paths = articles.map((article) => ({
        params: { slug: article.slug },
    }));

    return {
        paths,
        fallback: "blocking", // Only pre-rendered paths will be available
    };
}

// getStaticProps: Fetch data for each page
export async function getStaticProps({ params }) {
    const { slug } = params;
    const article = await fetchArticle(slug);

    if (!article) {
        return { notFound: true }; // Return 404 if article not found
    }

    return {
        props: {
            article,
            revalidate: 60,
        },
    };
}

// Blog Page Component
export default function BlogPage({ article }) {
    // console.log(article);

    return (
        <>
            <HomeFollow />
            <section className="page" data-scroll-section>
                <div className="container">
                    {article.featuredImage && (
                        <div style={{ marginBottom: "1.5rem" }}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/${article.featuredImage.url}`.replace(/\/\//g, '/')}
                                alt={article.featuredImage.alt || "Featured image"}
                                className="blogpage-image"
                                width={900}
                                height={400}
                            />
                        </div>
                    )}
                    <h1 className="title blog-title">{article.title}</h1>
                </div>
            </section>

            <section className="home_work" data-scroll-section>
                <div className="container">
                    <p>
                        Published on: {new Date(article.publishedDate).toLocaleDateString()}
                    </p>
                    {/* Render dynamic blocks */}
                    {article.content.map((block, index) => {
                        switch (block.blockType) {
                            case "wysiwyg":
                                return (
                                    <div key={index} style={{ marginBottom: "2rem" }}>
                                        {RichContentRenderer(block.content.root)}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                    {/* {article.categories?.length > 0 && (
                        <p>
                            <strong>Categories:</strong>{" "}
                            {article.categories.map((cat) => cat.name).join(", ")}
                        </p>
                    )} */}
                </div>
            </section>
            <Footer />
        </>
    );
}
