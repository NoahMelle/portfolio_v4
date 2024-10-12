const WebSocket = require("ws");
const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Websocket server is running");
});

function generateRandomUsername() {
    const adjectives = [
        "Happy",
        "Sad",
        "Angry",
        "Excited",
        "Silly",
        "Grumpy",
        "Sleepy",
        "Hungry",
        "Tired",
    ];
    const nouns = [
        "Panda",
        "Cat",
        "Dog",
        "Elephant",
        "Tiger",
        "Lion",
        "Bear",
        "Wolf",
        "Fox",
        "Rabbit",

    ];
    const randomAdjective =
        adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective}${randomNoun}`;
}

const pastelColors = ["#BFB2F3", "#96CAF7", "#9CDCAA", "#E5E1AB", "#F3C6A5"];

const wss = new WebSocket.Server({ server });

const clients = new Map();

wss.on("connection", (ws) => {
    const metadata = {
        username: generateRandomUsername(),
        color: `${pastelColors[Math.floor(Math.random() * pastelColors.length)]}`,
    };

    console.log("Client connected");
    clients.set(ws, metadata);

    ws.on("message", (msg) => {
        const message = JSON.parse(msg);

        if (!message?.type) {
            return;
        }

        switch (message.type) {
            case "cursor":
                broadcastMessage(
                    {
                        type: "cursor",
                        username: metadata.username,
                        color: metadata.color,
                        position: message.data,
                    },
                    ws
                );
                break;
        }
    });

    ws.send(
        JSON.stringify({
            type: "hello",
            message: "Hello from the server!",
        })
    );

    ws.on("close", () => {
        console.log("Client disconnected");
        clients.delete(ws);
        broadcastMessage(
            {
                type: "disconnect",
                username: metadata.username,
            },
            ws
        );
    });
});

function broadcastMessage(message, sender) {
    [...clients.keys()].forEach((client) => {
        if (client !== sender) {
            client.send(JSON.stringify(message));
        }
    });
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`);
});
