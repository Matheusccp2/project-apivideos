import { fastify } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const database = new DatabasePostgres();

// Registro dos plugins de Swagger
await server.register(swagger, {
  swagger: {
    info: {
      title: 'API de Vídeos',
      description: 'Documentação da API que gerencia vídeos',
      version: '1.0.0',
    },
  },
});

await server.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  staticCSP: true,
});

// Rota POST /videos
server.post('/videos', {
  schema: {
    summary: 'Criar um novo vídeo',
    tags: ['Vídeos'],
    body: {
      type: 'object',
      required: ['title', 'description', 'duration'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        duration: { type: 'number' },
      },
    },
    response: {
      201: {
        description: 'Vídeo criado com sucesso',
        type: 'null',
      },
    },
  },
  handler: async (req, res) => {
    const { title, description, duration } = req.body;
    await database.create({ title, description, duration });
    return res.status(201).send();
  },
});

// Rota GET /videos
server.get('/videos', {
  schema: {
    summary: 'Listar vídeos',
    tags: ['Vídeos'],
    querystring: {
      type: 'object',
      properties: {
        search: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            duration: { type: 'number' },
          },
        },
      },
    },
  },
  handler: async (req) => {
    const search = req.query.search;
    return await database.list(search);
  },
});

// Rota PUT /videos/:id
server.put('/videos/:id', {
  schema: {
    summary: 'Atualizar um vídeo existente',
    tags: ['Vídeos'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    body: {
      type: 'object',
      required: ['title', 'description', 'duration'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        duration: { type: 'number' },
      },
    },
    response: {
      204: {
        description: 'Vídeo atualizado com sucesso',
        type: 'null',
      },
    },
  },
  handler: async (req, res) => {
    const videoId = req.params.id;
    const { title, description, duration } = req.body;
    await database.update(videoId, { title, description, duration });
    return res.status(204).send();
  },
});

// Rota DELETE /videos/:id
server.delete('/videos/:id', {
  schema: {
    summary: 'Deletar um vídeo',
    tags: ['Vídeos'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    response: {
      204: {
        description: 'Vídeo deletado com sucesso',
        type: 'null',
      },
    },
  },
  handler: (req, res) => {
    const videoId = req.params.id;
    database.delete(videoId);
    return res.status(204).send();
  },
});

// Inicializa o servidor
server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
});
