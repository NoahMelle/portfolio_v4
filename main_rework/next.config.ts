import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

console.log("process.env.BASEURL_API", process.env.BASEURL_API);

const apiUrl = new URL(process.env.BASEURL_API || "http://localhost:1337");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
                hostname: apiUrl.hostname,
                port: apiUrl.port,
            }
        ]
    },
};

export default withNextIntl(nextConfig);