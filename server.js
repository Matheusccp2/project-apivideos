import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();
const database = new DatabaseMemory();

server.post("/videos", (res, req) => {
  return "Hello World";
server.post("/videos", (req, res) => {
  const { title, description, duration } = req.body;

  database.create({
    title,
    description,
    duration,
  });

  return res.status(201).send();
});

server.get("/videos", (res, req) => {
  return "Hello Rocketseat";
server.get("/videos", (req, res) => {
  const videos = database.list();

  return videos;
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
