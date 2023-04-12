const puppeteer = require('puppeteer');
const fs = require('fs');
const proxysModels = require('../models/proxys');
const acctModels = require('../models/accounts');
const killBots = require('../models/killBots');

const launchBotsFollow = async (proxy, id, name_model, username, password, index, idRegisterCompBotContainer, isFollow) => {
    
    try {
        process.setMaxListeners(Infinity);
        const browser = await puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            args: [
                // `--proxy-server=${proxy}`,
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
                '--disable-dev-shm-usage',
                '--no-zygote',
                '--single-process',
                "--disable-blink-features=AutomationControlled",
                "excludeSwitches={'enable-automation','ignore-certificate-errors','enable-logging'}"
            ],
            headless: false
        })
        const browserPID = browser.process().pid
        const newIdKBot = new killBots({
            NmrKill: browserPID,
            nameModel: name_model,
            acct_id: id,
            type: 'actsLoguedAndFollow',
            idRegisterCompBotContainer,
            proxy
        })

        await newIdKBot.save();
        const page = (await browser.pages())[0];
        await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
        const cookies = fs.readFileSync('httpbin-cookies.json', 'utf8');
        const deserializedCookies = JSON.parse(cookies);
        await page.setCookie(...deserializedCookies);
        /////////////////////////////////////////////////////////////////////////////
        await open_tab('https://chaturbate.com/' , browser);
        await page.waitForTimeout(20000)
        await open_tabDos('https://chaturbate.com/auth/login/' , browser, proxy, name_model, username, password, index, isFollow, id);
        await page.close();
        let pageDos = (await browser.pages())[0];
        await pageDos.close();
    } catch (error) {
        console.log(error.message)
    }

}

const vDosBot = async (name_model, proxy, idRegisterCompBotContainer) => {
    try {
        process.setMaxListeners(Infinity);
        const browser = await puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
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
                '--disable-dev-shm-usage',
                '--no-zygote',
                '--single-process',
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
        //////////////////////////////////////////////////////////////////////////////
        await page.goto(`https://chaturbate.com/${name_model}`);
        await page.waitForTimeout(1000)
        console.log("=====================");
        console.log("dentro del streaming");
        console.log("=====================");
    } catch (error) {
        console.log(error.message)
    }
}

const botDebug = async (proxy, name_model, username, password, index) => {
    
    try {
        process.setMaxListeners(Infinity);
        const browser = await puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            args: [
                // `--proxy-server=${proxy}`,
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
                '--disable-dev-shm-usage',
                '--no-zygote',
                '--single-process',
                "--disable-blink-features=AutomationControlled",
                "excludeSwitches={'enable-automation','ignore-certificate-errors','enable-logging'}"
            ],
            headless: false
        })
        const browserPID = browser.process().pid
        // const newIdKBot = new killBots({
        //     NmrKill: browserPID,
        //     nameModel: name_model,
        //     acct_id: id,
        //     type: 'actsLogued',
        //     idRegisterCompBotContainer,
        //     proxy
        // })

        // await newIdKBot.save();
        const page = (await browser.pages())[0];
        await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
        const cookies = fs.readFileSync('httpbin-cookies.json', 'utf8');
        const deserializedCookies = JSON.parse(cookies);
        await page.setCookie(...deserializedCookies);

        ///////////////////////////////////////////////////////////////////////////////////
        await open_tab('https://chaturbate.com/' , browser);
        await page.waitForTimeout(20000)
        await open_tabDos('https://chaturbate.com/auth/login/' , browser, proxy, name_model, username, password, index);
        await page.close();
        let pageDos = (await browser.pages())[0];
        await pageDos.close();
    } catch (error) {
        console.log(error.message)
    }
}

async function open_tab( url , browser ){
    try {
        const  page  = await browser.newPage();
        await page.setViewport({width: 1200, height: 1000});
        await page.goto( url );
        await page.waitForTimeout(3000)
        const b = (await page.$x("//*[@id='room_list']/li"))[7]
        b.click()
        await page.waitForTimeout(5000)
        // await page.screenshot({path: `storage/2.jpg`})
        return;
    } catch (error) {
        console.log(error.message);
    }
}
async function open_tabDos( url , browser, proxy, name_model, username, password, index, isFollow, id ){
    try {
        const  page  = await browser.newPage();
        await page.setViewport({width: 1200, height: 1000});
        await page.goto( url );
        ///////////////////////////////////////////////////////////
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
            const dataC = await acctModels.findOne({username})
            dataC.stricks++
            if (dataC.stricks === 5) {
                dataC.isWorking = false
            }
            await dataC.save();
            return;
        }
        if (isFollow === true) {
            open_tabTres('https://chaturbate.com/', browser, name_model, id)
        }else{
            await page.goto(`https://chaturbate.com/${name_model}`);
        }
        // await page.goto(`https://chaturbate.com/${name_model}`);
    } catch (error) {
        console.log(error.message)
    }
}
async function open_tabTres( url , browser, urlModel, id){
    try {
        const  page  = await browser.newPage();
        await page.setViewport({width: 1200, height: 1000});
        await page.goto( url );
        await page.waitForTimeout(3000)
        const b = (await page.$x("//*[@id='room_list']/li"))[7]
        b.click()
        await page.waitForTimeout(5000)
        await page.goto(`https://chaturbate.com/${urlModel}`);
        await page.waitForTimeout(5000)
        const followButton = await page.$('.followButton')
        await followButton.click()
        let data = await acctModels.findOne({_id: id})
        data.arrayModelsFollowers = data.arrayModelsFollowers.concat(urlModel)
        data.nFolloers++
        await data.save();
        await page.waitForTimeout(5000)
        // hacer scroll hasta arriba de la pagina
        await page.evaluate(() => {
            window.scrollTo(0, 0);
        });
        await page.waitForTimeout(5000)
        return;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {launchBotsFollow, botDebug, vDosBot}