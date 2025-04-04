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

let inactivityTimeout;
let inactivityCheckInterval = 15000;
const IDLE_TRESHOLD = 30000;

wss.on("connection", (ws) => {
    const metadata = {
        username: generateRandomUsername(),
        color: `${
            pastelColors[Math.floor(Math.random() * pastelColors.length)]
        }`,
        lastMove: new Date().getTime(),
    };

    if (!inactivityTimeout) {
        startInactivityCheck();
    }

    console.log("Client connected");
    clients.set(ws, metadata);

    ws.on("message", (msg) => {
        const message = JSON.parse(msg);

        if (!message?.type) {
            return;
        }

        switch (message.type) {
            case "cursor":
                clients.set(ws, {
                    ...metadata,
                    lastMove: new Date().getTime(),
                });
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
            case "ping":
                clients.set(ws, {
                    ...metadata,
                    lastMove: new Date().getTime(),
                });
                break;
        }
    });

    broadcastMessage(
        {
            type: "connect",
            username: metadata.username,
        },
        ws
    );

    ws.on("close", () => {

        console.log("Client disconnected");
        clients.delete(ws);
        if (clients.size === 0) {
            stopInactivityCheck();
        }
        broadcastMessage(
            {
                type: "disconnect",
                username: metadata.username,
            },
            ws
        );
    });
});

function startInactivityCheck() {
    if (inactivityTimeout) {
        return;
    }

    inactivityTimeout = setInterval(
        checkInactiveClients,
        inactivityCheckInterval
    );
}

function stopInactivityCheck() {
    console.log("Stopping inactivity check");
    clearInterval(inactivityTimeout);
    inactivityTimeout = null;
}

function checkInactiveClients() {
    console.log("Checking inactive clients");
    const now = new Date();
    for (const [client, metadata] of clients.entries()) {
        if (now - metadata.lastMove > IDLE_TRESHOLD) {
            client.send(
                JSON.stringify({
                    type: "idle",
                })
            );
            client.terminate();
            clients.delete(client);
        }
    }

    console.log("Active clients: ", clients.size);
}

function broadcastMessage(message, sender) {
    [...clients.keys()].forEach((client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`);
});
