import Fastify from "fastify";
import cors from '@fastify/cors'

import { linkRoutes } from "./routes/link";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(linkRoutes)
  await fastify.register(userRoutes)
  await fastify.register(authRoutes)

  await fastify.listen({ port: 3333 })
}

bootstrap()