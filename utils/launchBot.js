const puppeteer = require('puppeteer');
const fs = require('fs');
const proxysModels = require('../models/proxys');
const killBots = require('../models/killBots');


const launchBot = async (proxy, username, password, id, nameModel) => {
// const launchBot = async (username, password, id, nameModel) => {
    // prepare for headless chrome
    process.setMaxListeners(Infinity);

    const browser = await puppeteer.launch({
        args: [
            // "--proxy-server=185.249.1.151:8800 ",
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
    });
    const browserPID = browser.process().pid

    // console.log("browserPID:", browserPID);

    const page = (await browser.pages())[0];
    await page.setDefaultNavigationTimeout(0);
    // await page.setViewport({
    //     width: 1920,
    //     height: 1080,
    //   });
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36");

    // Saved cookies reading
    const cookies = fs.readFileSync('httpbin-cookies.json', 'utf8');

    const deserializedCookies = JSON.parse(cookies);
    await page.setCookie(...deserializedCookies);

    // Check the result

    try {
        await page.goto('https://chaturbate.com/auth/login/');
        console.log(`bot con PID : ${browserPID} lanzado dentro de la pagina`);
        await page.waitForTimeout(`${Math.floor((Math.random() * (10-6))+6)}000`);
        await page.type('#id_username', username);
        await page.waitForTimeout(`${Math.floor((Math.random() * (5-3))+3)}000`);
        await page.type('#id_password', password);
        await page.waitForTimeout(`${Math.floor((Math.random() * (10-7))+7)}000`);
        await page.click('.button');
        await page.waitForTimeout(5000);
        console.log("login terminado");
        
        const newIdKBot = new killBots({
            NmrKill: browserPID,
            acct_id: id,
            proxy
        })
    
        await newIdKBot.save();
        
        try {
            const texto = await page.evaluate(() => document.querySelector("pre").innerText);
            console.log(texto);
            if (texto === "Try slowing down") {
                console.log("=======================");
                console.log("Try slowing down");
                console.log("=======================");
                process.kill(browserPID);
                console.log("chrome kill");
                const dataProxy = await proxysModels.findOne({proxy})
                if (!dataProxy) {
                    return console.log("proxy no encontrado");
                }
                dataProxy.Nusers--
                console.log("bot de respaldo lanzado");
                launchBotCatch(nameModel, id, username, password)
                await dataProxy.save();
            }
        } catch (error) {
            console.log('Try slowing down no encontrado')
            await page.keyboard.press('Tab');
            await page.waitForTimeout(`${Math.floor((Math.random() * (10-5))+5)}000`);
            await page.keyboard.press('Tab');
            await page.waitForTimeout(`${Math.floor((Math.random() * (10-5))+5)}000`);
            await page.keyboard.press('Tab');
            await page.waitForTimeout(`${Math.floor((Math.random() * (10-5))+5)}000`);
            await page.keyboard.press('Enter');
            await page.waitForTimeout(`${Math.floor((Math.random() * (15-11))+11)}000`);
            
            try {
                const name = await page.evaluate(() => document.querySelector('.user_information_header_username').innerText);
                if (name) {
                    console.log("=====================");
                    console.log("username:", name);
                    console.log("login exitoso");
                    console.log("=====================");
                }
            } catch (error) {
                console.log("cuenta no logueada");
                
            }
            
            await page.waitForTimeout(`${Math.floor((Math.random() * (5-1))+1)}000`);
            await page.goto(`https://chaturbate.com/${nameModel}/`);
            await page.waitForTimeout(`${Math.floor((Math.random() * (5-1))+1)}000`);
            console.log("dentro del streaming");
        }
    
        
    } catch (error) {
        console.log(error.message);
        const dataProxy = await proxysModels.findOne({proxy})
        if (!dataProxy) {
            return console.log("Error encontrando proxy");
        }
        if (dataProxy.isDown === true) {
            process.kill(browserPID)
            return console.log("Proxy caido");
        }
        dataProxy.isDown = true;
        await dataProxy.save();
        process.kill(browserPID)
        console.log("Proxy caido");
    }


    // await browser.close();
};

const launchBotDos = async (proxy) => {

    // prepare for headless chrome
    process.setMaxListeners(Infinity);
    const browser = await puppeteer.launch({
        args: [
            // "--proxy-server=154.12.210.68:8800",
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
        headless: false
    });
    const browserPID = browser.process().pid

    console.log("browserPID:", browserPID);

    const page = (await browser.pages())[0];
    // await page.setDefaultNavigationTimeout(0);
    // await page.setViewport({
    //     width: 1920,
    //     height: 1080,
    //   });
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36");

    // Saved cookies reading
    const cookies = fs.readFileSync('httpbin-cookies.json', 'utf8');

    const deserializedCookies = JSON.parse(cookies);
    await page.setCookie(...deserializedCookies);

    // Check the result

    try {
        await page.goto('https://www.ionos.es/tools/direccion-ip');
        // await page.goto('https://youtube.com');
        console.log("bot lanzado dentro de la pagina");
    } catch (error) {
        if (error.message === 'net::ERR_TUNNEL_CONNECTION_FAILED at https://www.ionos.es/tools/direccion-ip') {
            console.log(error.message)
        }
    }
}

const launchBotCatch = async (nameModel, id, username, password) => {
    const dataProxy = await proxysModels.findOne({isFull: false})
    if (!dataProxy) {
        return console.log("Error encontrando proxy");
    }
    dataProxy.Nusers++
    await dataProxy.save()
    process.setMaxListeners(Infinity);

    const browser = await puppeteer.launch({
        args: [
            // "--proxy-server=185.249.1.151:8800 ",
            `--proxy-server=${dataProxy.proxy}`,
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
    });
    const browserPID = browser.process().pid

    console.log("browserPID:", browserPID);

    const page = (await browser.pages())[0];
    await page.setDefaultNavigationTimeout(0);
    // await page.setViewport({
    //     width: 1920,
    //     height: 1080,
    //   });
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36");

    // Saved cookies reading
    const cookies = fs.readFileSync('httpbin-cookies.json', 'utf8');

    const deserializedCookies = JSON.parse(cookies);
    await page.setCookie(...deserializedCookies);

    try {
        await page.waitForTimeout(`${Math.floor((Math.random() * (10-5))+5)}000`);
        await page.goto(`https://chaturbate.com/${nameModel}/`);
        console.log("Dentro de la pagina");
        await page.waitForTimeout(`${Math.floor((Math.random() * (15-10))+10)}000`);
        await page.click('#close_entrance_terms')
        await page.waitForTimeout(`${Math.floor((Math.random() * (5-1))+1)}000`);
        const newIdKBot = new killBots({
            NmrKill: browserPID,
            acct_id: id,
            proxy: dataProxy.proxy
        })
        await newIdKBot.save();
        await page.waitForTimeout(`${Math.floor((Math.random() * (5-1))+1)}000`);
        await page.keyboard.press('h');
        await page.keyboard.press('o');
        await page.keyboard.press('l');
        await page.keyboard.press('a');
        await page.waitForTimeout(`${Math.floor((Math.random() * (5-1))+1)}000`);
        await page.keyboard.press('Enter');
        await page.waitForTimeout(`${Math.floor((Math.random() * (10-5))+5)}000`);
        await page.type('#username', username);
        await page.waitForTimeout(`${Math.floor((Math.random() * (10-5))+5)}000`);
        await page.type('#password', password);
        await page.waitForTimeout(`${Math.floor((Math.random() * (10-5))+5)}000`);
        await page.click('#id_login_btn');
        await page.waitForTimeout(5000);
        console.log("login terminado");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {launchBot, launchBotDos}