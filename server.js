import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();
const database = new DatabaseMemory();

server.post("/videos", (req, res) => {
  const { title, description, duration } = req.body;

  database.create({
    title,
    description,
    duration,
  });

  return res.status(201).send();
});

server.get("/videos", (req, res) => {
  const videos = database.list();

  return videos;
});

server.put("/videos/:id", (req, res) => {
  const videosId = req.params.id;
  const { title, description, duration } = req.body;

  database.update(videosId, {
    title,
    description,
    duration,
  });

  return res.status(204).send();
});

server.delete("/videos/:id", (res, req) => {
  return "Hello Node.js";
});

server.listen({
  port: 3333,
});
