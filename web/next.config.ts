import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // @mylocalguide/ui is a local workspace package that ships TSX source,
  // not a pre-built bundle — tell Next.js to run it through the same
  // build pipeline as first-party code instead of treating it as an
  // opaque pre-built dependency.
  transpilePackages: ["@mylocalguide/ui"],
  // web/ has its own nested .git (from create-next-app's auto-init),
  // which makes Turbopack think it's isolated from the monorepo root and
  // ignore the root package.json entirely — breaking resolution of
  // hoisted workspace deps. Point it at the real root explicitly.
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
