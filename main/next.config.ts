import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const apiUrl = new URL(process.env.BASEURL_API || "http://localhost:1337");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
                hostname: apiUrl.hostname,
                port: apiUrl.port,
            },
        ],
    },
    sassOptions: {
        silenceDeprecations: ["legacy-js-api"],
    },
};

export default withNextIntl(nextConfig);
