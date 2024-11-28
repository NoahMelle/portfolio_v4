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

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=31536000; includeSubDomains; preload",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "same-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
                    }
                ],
            },
        ];
    },
};

export default withNextIntl(nextConfig);
