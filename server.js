const moment = require('moment');
const puppeteer = require('puppeteer');
const express = require('express');
const CORS = require('cors');
let app = express();
app.use(CORS())

app.get('/img', async (req, res) => {
  const start_time_request = moment().format('x');
  const name = moment().format('x');
  await (async () => {
    const { url } = req.query
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)
    await page.screenshot({path: `img/${name}.png`, fullPage: true})
  })();
  const end_time_request = moment().format('x');
  await res.send({
    name: `${name}.png`,
    start_time_request,
    end_time_request,
    diff_request: end_time_request - start_time_request + ''
  })
})

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})
