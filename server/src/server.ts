import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { PoolRoutes } from './routers/pool'
import { UserRoutes } from './routers/user'
import { GameRoutes } from './routers/game'
import { GuessRoutes } from './routers/guess'
import { AuthRoutes } from './routers/auth'

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(jwt, {
    secret: 'nlw10-copa'
  })

  await fastify.register(AuthRoutes)
  await fastify.register(GameRoutes)
  await fastify.register(GuessRoutes) 
  await fastify.register(PoolRoutes)
  await fastify.register(UserRoutes)

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()