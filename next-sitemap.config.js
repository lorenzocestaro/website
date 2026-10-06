// Crawlers that collect AI training data, checked against
// https://github.com/ai-robots-txt/ai.robots.txt. Search crawlers and
// user-triggered AI fetchers stay allowed.
const AI_TRAINING_CRAWLERS = [
  "GPTBot",
  "ClaudeBot",
  "CCBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "meta-externalagent",
  "MistralAI-Training",
  "cohere-training-data-crawler",
  "Ai2Bot-Dolma",
  // Tools that build image datasets such as LAION.
  "img2dataset",
  "LAIONDownloader",
  "laion-huggingface-processor",
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      ...AI_TRAINING_CRAWLERS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
  },
  changefreq: "monthly",
  generateIndexSitemap: false,
  outDir: "./public",
};
