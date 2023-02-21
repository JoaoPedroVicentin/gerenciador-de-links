import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  if (req.method === 'POST') {
    const newLink = req.body

    await prisma.link.create({
      data: {
        url: newLink.url,
        userId: session.user?.id,
        name: newLink.name,
        image: newLink.image,
        icon: newLink.icon,
        description: newLink.description,
        title: newLink.title
      }
    })

    return res.status(201).end()
  }

  if (req.method === 'GET') {


    const links = await prisma.link.findMany({
      where: {
        userId: session.user.id,
      }
    })

    return res.json(links)
  }
}