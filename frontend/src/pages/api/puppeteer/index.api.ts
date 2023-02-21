import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from "puppeteer";
import { z } from 'zod'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const createLinkBody = z.object({
    url: z.string()
  })

  const { url } = createLinkBody.parse(req.body)

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.isInterceptResolutionHandled()) return;
    if (
      interceptedRequest.url().endsWith('.png') ||
      interceptedRequest.url().endsWith('.jpg')
    )
      interceptedRequest.abort();
    else interceptedRequest.continue();
  });
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
    return ogName ? ogName.getAttribute("content") : null
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

  return res.status(201).json(list)
}