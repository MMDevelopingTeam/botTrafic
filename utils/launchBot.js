const puppeteer = require('puppeteer');
const fs = require('fs');
const proxysModels = require('../models/proxys');
const acctModels = require('../models/accounts');
const killBots = require('../models/killBots');


const launchBotVDos = async (proxy, id, name_model, username, password, index, idRegisterCompBotContainer) => {
    
    process.setMaxListeners(Infinity);
    const browser = await puppeteer.launch({
        args: [
            `--proxy-server=${proxy}`,
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
    const browserPID = browser.process().pid
    const newIdKBot = new killBots({
        NmrKill: browserPID,
        nameModel: name_model,
        acct_id: id,
        type: 'actsLogued',
        idRegisterCompBotContainer,
        proxy
    })
    
    const dataKIll = await newIdKBot.save();
    
    const page = (await browser.pages())[0];
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({
        width: 1920,
        height: 947,
    });
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41");

    const cookies = fs.readFileSync('httpbin-cookies.json', 'utf8');
    const deserializedCookies = JSON.parse(cookies);
    await page.setCookie(...deserializedCookies);
    await page.waitForTimeout(2000)
    try {
        await page.goto('https://chaturbate.com/auth/login/');
        await page.waitForTimeout(8000)
        await page.keyboard.type(username)
        await page.keyboard.press('Tab')
        await page.waitForTimeout(8000)
        await page.keyboard.type(password)
        await page.waitForTimeout(2000)
        await page.keyboard.press('Tab')
        await page.waitForTimeout(2000)
        await page.keyboard.press('Tab')
        await page.waitForTimeout(2000)
        await page.keyboard.press('Enter')
        await page.waitForTimeout(8000)
        await page.goto(`https://chaturbate.com/tipping/free_tokens/`);
        await page.waitForTimeout(2000)
        if (await page.url() === 'https://chaturbate.com/auth/login/?next=/tipping/free_tokens/') {
            console.log("###########################################");
            console.log("username:", username);
            console.log("proxy:", proxy);
            console.log("Bot:", index);
            console.log("cuenta no logueada");  
            console.log("###########################################"); 
            // await page.screenshot({path: `storage/${username}.jpg`})
            const dataUsr = await acctModels.findOne({_id: id})
            dataUsr.isUsed=false
            const dataProxy = await proxysModels.findOne({proxy})
            if (!dataProxy) {
                return console.log("proxy no encontrado");
            }
            dataProxy.Nusers--
            if (dataProxy.Nusers <= 10) {
                dataProxy.isFull=false
            }
            // await dataUsr.save();
            // await dataProxy.save();
            // await killBots.deleteOne({_id: dataKIll._id})
            // await browser.close()
            return;
        }
        await page.waitForTimeout(1000)
        await page.goto(`https://chaturbate.com/${name_model}`);
        console.log("=====================");
        console.log("username:", username);
        console.log("proxy:", proxy);
        console.log("Bot:", index);
        console.log("login exitoso");
        console.log("dentro del streaming");
        console.log("=====================");
    } catch (error) {
        console.log(error.message)
    }
}

const vDosBot = async (name_model, proxy, idRegisterCompBotContainer) => {
    process.setMaxListeners(Infinity);
    const browser = await puppeteer.launch({
        args: [
            `--proxy-server=${proxy}`,
            // `--proxy-server=138.128.119.188:8800`,
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
    const browserPID = browser.process().pid
    const newIdKBot = new killBots({
        NmrKill: browserPID,
        nameModel: name_model,
        type: 'actsAny',
        proxy,
        idRegisterCompBotContainer
    })
    
    const dataKIll = await newIdKBot.save();
    
    const page = (await browser.pages())[0];
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({
        width: 1920,
        height: 947,
    });
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41");

    const cookies = fs.readFileSync('httpbin-cookies.json', 'utf8');
    const deserializedCookies = JSON.parse(cookies);
    await page.setCookie(...deserializedCookies);
    await page.waitForTimeout(2000)
    try {
        await page.goto(`https://chaturbate.com/${name_model}`);
        await page.waitForTimeout(1000)
        console.log("=====================");
        console.log("dentro del streaming");
        console.log("=====================");
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {launchBotVDos, vDosBot}