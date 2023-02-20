import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id
    // DELETE
    if (req.method === 'DELETE') {
        await prisma.link.delete({
            where:{
                id: String(id)
            }
        })
        return res.status(201).end()
    } 
}