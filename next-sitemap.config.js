/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  changefreq: "monthly",
  generateIndexSitemap: false,
  outDir: "./public",
};
