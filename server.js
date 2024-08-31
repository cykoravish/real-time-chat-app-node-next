const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketIo = require("socket.io");

// Load environment variables from .env file
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Get allowed users from environment variable
const allowedUsers = process.env.ALLOWED_USERS
  ? process.env.ALLOWED_USERS.split(",")
  : [];
const onlineUsers = {}; // Track online users
const userSockets = {}; // Track user sockets for disconnection

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketIo(server, {
    cors: {
      origin: "https://ravish.fun", // Your frontend domain
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"], // Optional: Add any custom headers you need
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    // Track user by socket ID
    socket.on("set username", (username) => {
      if (allowedUsers.includes(username)) {
        onlineUsers[username] = "online";
        userSockets[username] = socket.id;
        io.emit("user status", onlineUsers);
      }
    });

    socket.on("chat message", (msg) => {
      if (allowedUsers.includes(msg.username)) {
        io.emit("chat message", msg);
      }
    });

    socket.on("clear chat", () => {
      io.emit("clear chat"); // Broadcast clear chat event to all clients
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");

      // Remove the user from online status if their socket ID matches
      for (const [username, socketId] of Object.entries(userSockets)) {
        if (socketId === socket.id) {
          onlineUsers[username] = "offline";
          delete userSockets[username]; // Remove user socket entry
          break;
        }
      }
      io.emit("user status", onlineUsers);
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
