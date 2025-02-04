export function constructWebsocketURL() {
  const wsProtocol = process.env.WEBSOCKET_PROTOCOL || "ws";
  const wsHost = process.env.WEBSOCKET_HOST || "localhost";
  const wsPort = process.env.WEBSOCKET_PORT || "8080";

  return `${wsProtocol}://${wsHost}${
    process.env.NODE_ENV === "development" || process.env.WEBSOCKET_PORT
      ? `:${wsPort}`
      : ""
  }`;
}
