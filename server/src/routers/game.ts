import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"
import { Authenticate } from "../plugins/authenticate"

export async function GameRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/:id/games', { onRequest: [Authenticate] }, async (request) => {
    const getPoolParams = z.object({
      id: z.string()
    })

    const { id } = getPoolParams.parse(request.params)

    const games = await prisma.game.findMany({
      orderBy: {
        data: 'desc',        
      },
      include: {
        guesses: {
          where: {
            participants: {
              userId: request.user.sub,
              poolId: id
            }
          }
        }
      }
    })

    return { 
      games: games.map(games => {
        return {
          ...games,
          guess: games.guesses.length > 0 ? games.guesses[0] : null,
          guesses: undefined
        }
      }) 
    }
  })
}