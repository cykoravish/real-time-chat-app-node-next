const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketIo = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const allowedUsers = ["Ravish", "Dipu"]; // Replace these with your usernames
const onlineUsers = {}; //set teh track of online users

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    // Add user to online users
    socket.on("set username", (username) => {
      if (allowedUsers.includes(username)) {
        onlineUsers[username] = "online";
        io.emit("user status", onlineUsers);
      }
    });

    socket.on("chat message", (msg) => {
      // console.log("msg:", msg);
      // Only allow messages from allowed users
      if (allowedUsers.includes(msg.username)) {
        // console.log(allowedUsers);
        io.emit("chat message", msg);
      }
    });

    socket.on("clear chat", () => {
      io.emit("clear chat"); // Broadcast clear chat event to all clients
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");

      // Update the user status to offline and broadcast the change
      for (const [username, status] of Object.entries(onlineUsers)) {
        if (status === "online") {
          onlineUsers[username] = "offline"; // Set user status to offline
          io.emit("user status", onlineUsers); // Broadcast updated user statuses
        }
      }
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
