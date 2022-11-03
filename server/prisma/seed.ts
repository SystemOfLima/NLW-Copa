import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/systemoflima.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: "John Doe Pool",
      code: "BOLAONLW",
      ownerId: user.id,
      
      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      data: '2022-11-02T12:03:53.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountyCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      data: '2022-11-12T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountyCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participants: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()