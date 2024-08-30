const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketIo = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const allowedUsers = ["Ravish", "Dipu"]; // Replace these with your usernames

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("chat message", (msg) => {
      console.log("msg:", msg);
      // Only allow messages from allowed users
      if (allowedUsers.includes(msg.username)) {
        console.log(allowedUsers)
        io.emit("chat message", msg);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
