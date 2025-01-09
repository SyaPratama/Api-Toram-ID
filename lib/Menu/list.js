import { connect } from "puppeteer-real-browser"
import puppeteerPlugin from "puppeteer-extra-plugin-click-and-wait";
async function test() {

   const { browser, page } = await connect({

       headless: false,

       args: ["--start-maximized"],

       customConfig: {},

       turnstile: true,

       connectOption: {
         defaultViewport: null
       },
       plugins:[
         puppeteerPlugin(),
       ],
       disableXvfb: false,
       ignoreAllFlags: false
   });

   await page.goto('https://toram-id.com/',{
      waitUntil: "domcontentloaded"
   })
   await page.clickAndWaitForNavigation('body');
}

test()