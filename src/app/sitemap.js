import { posts } from '../data/posts';

export default async function sitemap() {
    const baseUrl = 'https://casa-dev.com';

    // Static routes
    const routes = [
        '',
        '/about',
        '/about/los-angeles',
        '/about/portland',
        '/about/irvine',
        '/services',
        '/portfolio',
        '/blog',
        '/pricing',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic blog routes
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
}
