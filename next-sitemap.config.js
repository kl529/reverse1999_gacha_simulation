/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://reverse1999-simulator.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 1,
    alternateRefs: [
        {
            href: 'https://reverse1999-simulator.com/ko',
            hreflang: 'ko',
        },
        {
            href: 'https://reverse1999-simulator.com/en',
            hreflang: 'en',
        },
    ],
    exclude: [
        '/ko', '/en',
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: []
            },
        ]
    }
}