const fastify = require('fastify')
const cors = require('@fastify/cors')

let chrome = {}
let puppeteer

if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
    chrome = require("chrome-aws-lambda")
    puppeteer = require("puppeteer-core")
} else {
    puppeteer = require("puppeteer")
}


async function bootstrap() {
    const app = fastify({
        logger: true
    })

    await app.register(cors, {
        origin: true
    })

    app.post('/puppeteer', async (request, reply) => {
        let options = {}

        const { url } = request.body

        if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
            options = {
                args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
                defaultViewport: chrome.defaultViewport,
                executablePath: await chrome.executablePath,
                headless: true,
                ignoreHTTPSErrors: true
            }
        }

        const browser = await puppeteer.launch(options);
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

        return reply.status(201).send(list)

    })

    app.listen({ port: process.env.PORT || 3030 })
}

bootstrap()