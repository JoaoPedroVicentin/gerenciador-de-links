"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));
var import_puppeteer = __toESM(require("puppeteer"));
var import_zod = require("zod");
async function bootstrap() {
  const fastify = (0, import_fastify.default)({
    logger: true
  });
  await fastify.register(import_cors.default, {
    origin: true
  });
  fastify.post("/puppeteer", async (request, reply) => {
    const createLinkBody = import_zod.z.object({
      url: import_zod.z.string()
    });
    const { url } = createLinkBody.parse(request.body);
    const browser = await import_puppeteer.default.launch({ headless: true });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", (interceptedRequest) => {
      if (interceptedRequest.isInterceptResolutionHandled())
        return;
      if (interceptedRequest.url().endsWith(".png") || interceptedRequest.url().endsWith(".jpg"))
        interceptedRequest.abort();
      else
        interceptedRequest.continue();
    });
    await page.goto(url);
    const title = await page.evaluate(() => {
      const ogTitle = document.head.querySelector('meta[property="og:title"]');
      return ogTitle ? ogTitle.getAttribute("content") : null;
    });
    const description = await page.evaluate(() => {
      const ogDescription = document.head.querySelector('meta[property="og:description"]');
      return ogDescription ? ogDescription.getAttribute("content") : null;
    });
    const name = await page.evaluate(() => {
      const ogName = document.head.querySelector('meta[property="og:site_name"]');
      return ogName ? ogName.getAttribute("content") : null;
    });
    const image = await page.evaluate(() => {
      const ogImage = document.head.querySelector('meta[property="og:image"]');
      return ogImage ? ogImage.getAttribute("content") : null;
    });
    const icon = await page.evaluate(() => {
      const ogIcon = document.head.querySelector('link[rel="icon"]');
      return ogIcon ? ogIcon.getAttribute("href") : null;
    });
    const list = {
      title,
      url,
      description,
      name,
      image,
      icon
    };
    await browser.close();
    return reply.status(201).send(list);
  });
  await fastify.listen({ port: 3030 });
}
bootstrap();
