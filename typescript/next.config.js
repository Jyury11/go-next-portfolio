/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  basePath:
    process.env.NODE_ENV === "development" ? "" : "/aono-portfolio-frontend",
  assetPrefix:
    process.env.NODE_ENV === "development"
      ? "/"
      : "https://storage.googleapis.com/aono-portfolio-frontend/",
};
