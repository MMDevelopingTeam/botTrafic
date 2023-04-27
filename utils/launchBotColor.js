const puppeteer = require('puppeteer');
const fs = require('fs');
const proxysModels = require('../models/proxys');
const accountsColorModels = require('../models/accountsColor');
const killBots = require('../models/killBots');

const launchBotColor = async (proxy, id, name_model, username, password, index, idRegisterCompBotContainer, isFollow) => {
    
    try {
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
            headless: false
        })
        const browserPID = browser.process().pid
        const newIdKBot = new killBots({
            NmrKill: browserPID,
            nameModel: name_model,
            acct_id: id,
            type: 'actsLoguedColor',
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

async function open_tab( url , browser ){
    try {
        const  page  = await browser.newPage();
        await page.setViewport({width: 1200, height: 1000});
        await page.goto( url );
        await page.waitForTimeout(20000)
        await page.evaluate(() => {
            window.scrollBy(0, 10000);
        });
        await page.waitForTimeout(20000)
        await page.evaluate(() => {
            window.scrollBy(0, -10000);
        });
        await page.waitForTimeout(20000)
        await page.evaluate(() => {
            window.scrollBy(0, 10000);
        });
        await page.waitForTimeout(20000)
        const a = (await page.$x("//*[@id='roomlist_pagination']/ul/li[3]/a"))[0]
        a.click()
        await page.waitForTimeout(5000)
        await page.evaluate(() => {
            window.scrollBy(0, 10000);
        });
        await page.waitForTimeout(30000)
        await page.evaluate(() => {
            window.scrollBy(0, -10000);
        });
        await page.waitForTimeout(10000)
        await page.evaluate(() => {
            window.scrollBy(0, 10000);
        });
        await page.waitForTimeout(5000)
        const c = (await page.$x("//*[@id='roomlist_pagination']/ul/li[4]/a"))[0]
        c.click()
        await page.waitForTimeout(5000)
        await page.evaluate(() => {
            window.scrollBy(0, 10000);
        });
        await page.waitForTimeout(15000)
        // generate random number en el rango de 1 a 20
        const random = Math.floor(Math.random() * (20 - 1)) + 1;
        const b = (await page.$x("//*[@id='room_list']/li"))[random]
        b.click()
        await page.waitForTimeout(1000)
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
            const dataC = await accountsColorModels.findOne({username})
            dataC.stricks++
            if (dataC.stricks === 5) {
                dataC.isWorking = false
            }
            await dataC.save();
            return;
        }
        if (isFollow === true) {
            console.log('No la sigue');
            open_tabTres('https://chaturbate.com/', browser, name_model, id)
        }else{
            console.log('Ya la sigue');
            await page.waitForTimeout(2000)
            const followed_counts = await page.$('.followed_counts')
            await followed_counts.click()
            await page.waitForTimeout(2000)
            const roomElementAnchor = await page.$$('.roomElementAnchor')
            try {                
                for (let i = 0; i < roomElementAnchor.length; i++) {
                    const element = roomElementAnchor[i];
                    const text = await element.$eval('span', el => el.textContent);
                    if (text === name_model) {
                        await element.click()
                        await page.waitForTimeout(2000)
                        return;
                    }else{
                        console.log("no encontro el modelo");
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
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
        
        let hasClass = await page.evaluate(() => {
            let followButton = document.querySelector('.followButton')
            let hasClass = followButton.classList.contains('display: none')
            return hasClass
        });
        if (hasClass === true) {
            console.log('Ya la sigue');
            return;
        }else{
            const followButtonSig = await page.$('.followButton')
            await followButtonSig.click()
            let data = await accountsColorModels.findOne({_id: id})
            data.arrayModelsFollowers = data.arrayModelsFollowers.concat(urlModel)
            data.nFolloers++
            await data.save();
            await page.waitForTimeout(5000)
            await page.evaluate(() => {
                window.scrollTo(0, 0);
            });
            await page.waitForTimeout(5000)
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {launchBotColor}