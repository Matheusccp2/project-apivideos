import { fastify } from "fastify";

const server = fastify();

server.post("/videos", (res, req) => {
  return "Hello World";
});

server.get("/videos", (res, req) => {
  return "Hello Rocketseat";
});

server.put("/videos/:id", (res, req) => {
  return "Hello Node.js";
});

server.delete("/videos/:id", (res, req) => {
  return "Hello Node.js";
});

server.listen({
  port: 3333,
});
