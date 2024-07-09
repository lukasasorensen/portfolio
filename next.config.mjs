/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src/styles")],
  },
  output: "standalone",
};

export default nextConfig;
