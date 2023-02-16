import Fastify from "fastify";
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import puppeteer from "puppeteer";
import { z } from 'zod'

const prisma = new PrismaClient({
  log: ['query']
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })

  fastify.get('/links', async () => {
    const count = await prisma.link.count()

    return { count }
  })

  fastify.post('/links', async (request, reply) => {
    const createLinkBody = z.object({
      url: z.string()
    })

    const { url } = createLinkBody.parse(request.body)

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const title = await page.evaluate(() => {
      const ogTitle = document.head.querySelector('meta[property="og:title"]');
      return ogTitle ? ogTitle.getAttribute("content") : null
    });

    const description = await page.evaluate(() => {
      const ogDescription = document.head.querySelector('meta[property="og:description"]');
      return ogDescription ? ogDescription.getAttribute("content") : null
    });

    const name = await page.evaluate(() => {
      const ogName = document.head.querySelector('meta[property="og:site_name"]');
      return ogName ? ogName.getAttribute("content"): null
    });

    const image = await page.evaluate(() => {
      const ogImage = document.head.querySelector('meta[property="og:image"]');
      return ogImage ? ogImage.getAttribute("content") : null
    });

    const icon = await page.evaluate(() => {
      const ogIcon = document.head.querySelector('link[rel="icon"]');
      return ogIcon ? ogIcon.getAttribute("href") : null
    });

    const list = {
      title: title,
      url: url,
      description: description,
      name: name,
      image: image,
      icon: icon
    }

    await browser.close();

    // await prisma.link.create({
    //   data: {
    //     title: list.title,
    //     url: list.url,
    //     description: list.description,
    //     name: list.name,
    //     image: list.image,
    //     icon: list.icon
    //   }
    // })

    return reply.status(201).send(list)
  })

  await fastify.listen({ port: 3333 })
}

bootstrap()