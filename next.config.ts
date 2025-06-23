import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: [
    "monocle2ai",
    "require-in-the-middle",
    "import-in-the-middle",
    "openai",
    "llamaindex",
    "langchain",
    "@langchain/core",
    "@langchain/openai",
    "@langchain",
  ],
};

export default nextConfig;
