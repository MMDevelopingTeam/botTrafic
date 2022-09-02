const puppeteer = require('puppeteer');
const proxysModels = require('../models/proxys');


const testProxys = async () => {
    
    process.setMaxListeners(Infinity);
    const browser = await puppeteer.launch({
        args: [
            "--start-maximized",
            "--disable-web-security",
            "--disable-extensions",
            "--disable-notifications",
            "--ignore-certificate-errors",
            "--no-sandbox",
            "--disable-gpu",
            "--log-level=3",
            "--allow-running-insecure-content",
            "--no-default-browser-check",
            "--no-first-run",
            "--disable-blink-features=AutomationControlled",
            "excludeSwitches={'enable-automation','ignore-certificate-errors','enable-logging'}"
        ],
        headless: true
    })
    
    const page = (await browser.pages())[0];
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({
        width: 1920,
        height: 947,
    });
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41");
    await page.waitForTimeout(1000)
    try {
        await page.goto('https://instantproxies.com/proxy-tester/');
        await page.waitForTimeout(1000)
        const dataP = await proxysModels.find();
        if (!dataP) {
            return console.log("dataP");
        }
        const frames = await page.frames();
        const myFrame = frames.find(
            f => f.url().indexOf("https://instantproxies.com/proxytester/test_frame.php") > -1
        );
        
        await myFrame.click("[name=proxies]");
        for (let index = 0; index < dataP.length; index++) {
            await page.keyboard.type(dataP[index].proxy)
            await page.waitForTimeout(200)
            await page.keyboard.press('Enter')
        }
        await myFrame.click("#testform div input[type=button]")
        await myFrame.waitForXPath(`//*[@id="results"]/div[${dataP.length*2}]`)
        // await page.waitForTimeout(5000)
        const proxysArry = await myFrame.evaluate(() => {
            const elementsP = document.querySelectorAll('.rproxy')
            const elements = document.querySelectorAll('.rstatus')
            const arrayElm = [];
            for (let index = 0; index < elements.length; index++) {
                arrayElm.push(`${elementsP[index].innerHTML} ${elements[index].innerHTML}`)
            }
            return arrayElm;
        });
        for (let index = 0; index < proxysArry.length; index++) {
            const spliTOne = proxysArry[index].split(' ')
            const proxySplit = spliTOne[0]
            const stateP = spliTOne[1].split('<')
            const stateProxy = stateP[1].split('b>')[1]
            const ms = spliTOne[4].split('ms')[0]
            const dataProxy = await proxysModels.findOne({proxy: proxySplit})
            if (!dataProxy) {
                return console.log("Proxy no encontrado");
            }
            if (stateProxy === 'ONLINE') {
                dataProxy.ms=Number(ms)
            }
            if (stateProxy === 'FAILED') {
                dataProxy.isDown=true
            }
            await dataProxy.save();
        }
        await browser.close();
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {testProxys}