import Fastify from "fastify";
import cors from '@fastify/cors'

import { linkRoutes } from "./routes/link";

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(linkRoutes)

  await fastify.listen({ port: 3333 })
}

bootstrap()