const puppeteer = require('puppeteer');
const fs = require('fs');

const generatorNames = async () => {
        const browser = await puppeteer.launch({
            args: [
                "--disable-web-security",
                "--disable-extensions",
                "--disable-notifications",
                "--ignore-certificate-errors",
                "--no-sandbox",
                "--start-maximized",
                "--disable-gpu",
                "--log-level=3",
                "--allow-running-insecure-content",
                "--no-default-browser-check",
                "--no-first-run",
                "--disable-blink-features=AutomationControlled",
                "excludeSwitches={'enable-automation','ignore-certificate-errors','enable-logging'}"
            ],
            headless: false
        });
        const page = (await browser.pages())[0];
        await page.setViewport({
            width: 1920,
            height: 1080,
        });
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36");
        const dataName = []
        const nameFile="storage/nameArray.txt"
        const files = fs.existsSync(nameFile)
        if (files) {
            fs.unlinkSync(`${nameFile}`)
        }
        await page.goto('https://fossbytes.com/tools/es/random-name-generator', {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        });
        await page.waitForTimeout(500)
        await page.type('#totalNames', "20")
        await page.waitForTimeout(500)
        await page.select('#language', `en`)
        await page.waitForTimeout(500)
        await page.click('#male')
        await page.waitForTimeout(500)
        await page.keyboard.press('Tab')
        await page.waitForTimeout(500)
        await page.keyboard.press('Enter')
        await page.waitForTimeout(500)
        for (let index = 1; index < 21; index++) {
            const [button] = await page.$x(`/html/body/div/div[1]/div/div[3]/div[2]/div/div[2]/div[2]/ul/li[${index}]`);
            let getMsg = await page.evaluate(name => name.innerText, button);
            getMsg=getMsg.split(' ')
            let username = getMsg[0]+Math.floor((Math.random() * (100-1))+1)+getMsg[1]
            username=username.replace(/ñ/g, 'n')
            username=username.replace('.', '')
            let usernameFinal=username.toLowerCase()
            dataName.push({username: usernameFinal, password: '12345678CuentaUsrCh'})
        }
        fs.writeFileSync(nameFile, JSON.stringify(dataName))
        // console.log("archivo creado");
        await browser.close();

};

module.exports = {generatorNames}