import createNextIntlPlugin from "next-intl/plugin";
import { constructWebsocketURL } from "./lib/envUtils";

const withNextIntl = createNextIntlPlugin();

const wsProtocol = process.env.WEBSOCKET_PROTOCOL || "ws";
const wsHost = process.env.WEBSOCKET_HOST || "localhost";
const wsPort = process.env.WEBSOCKET_PORT || "8080";

const apiUrl = new URL(process.env.BASEURL_API || "http://localhost:1337");
const websocketUrl = constructWebsocketURL();

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    connect-src 'self' ${websocketUrl};
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

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
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader.replace(/\n/g, ''),
                    }
                ],
            },
        ];
    },
};

export default withNextIntl(nextConfig);
