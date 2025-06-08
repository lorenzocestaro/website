/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${process.env.VERCEL_URL}`,
  generateRobotsTxt: true,
  changefreq: "monthly",
  generateIndexSitemap: false,
  outDir: "./public",
};
