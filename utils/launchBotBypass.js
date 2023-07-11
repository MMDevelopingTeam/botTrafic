const puppeteer = require('puppeteer');
const proxysModels = require('../models/proxys');
const acctModels = require('../models/accounts');
const killBots = require('../models/killBots');
const fs = require('fs');
const axios = require('axios');
const { execSync } = require('child_process');

const launchBotVDosBypass = async (proxy, id, name_model, username, password, index, idRegisterCompBotContainer) => {
    
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
            type: 'actsLogued',
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
        await open_tabDos('https://chaturbate.com/auth/login/' , browser, proxy, name_model, username, password, index);
        await page.close();
        let pageDos = (await browser.pages())[0];
        await pageDos.close();
    } catch (error) {
        console.log(error.message)
    }

}


////*[@id="challenge-stage"]/div/label/input
///html/body/table/tbody/tr/td/div/div[1]/table/tbody/tr/td[1]/div[1]/div/label/input
//#challenge-stage > div > label > input[type=checkbox]
//await page.waitForSelector('#challenge-stage > div > label > input');

async function open_tab( url , browser ){
    try {
        const  page  = await browser.newPage();
        await page.setViewport({width: 1200, height: 1000});
        await page.goto( url );
        await page.waitForTimeout(3000)
        //await page.waitForNavigation(); // Esperar a que la página haya terminado de cargar


        for (let i = 0; i < 13; i++) {
            await page.keyboard.press('Tab');
            await page.waitForTimeout(2000); // Esperar un breve intervalo entre cada pulsación
            //console.log("iteration " + i)
            await page.keyboard.press('Space');
/*
            // Obtener el elemento actualmente enfocado
            const focusedElement = await page.evaluate(() => {
                return document.activeElement ? document.activeElement.tagName : null;
              });

            console.log(`Elemento enfocado en la iteración ${i + 1}:`, focusedElement);
     
            if(focusedElement == "BODY"){
                page.keyboard.press('Space');
                //console.log("it has to be the check");
                //console.log("waiting 10 seconds to continue");
                await page.waitForTimeout(5000)
            }*/
          }

        

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
async function open_tabDos( url , browser, proxy, name_model, username, password, index ){
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
            // await page.screenshot({path: `storage/${username}1.jpg`})
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
            await dataUsr.save();
            await dataProxy.save();
            await killBots.deleteOne({_id: dataKIll._id})
            await browser.close()
            return;
        }
        await page.goto(`https://chaturbate.com/${name_model}`);
        console.log("=====================");
        console.log("username:", username);
        console.log("proxy:", proxy);
        console.log("Bot:", index);
        console.log("login exitoso");
        console.log("dentro del streaming");
        console.log("=====================");
        await page.scr
        await page.waitForTimeout(3000)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {launchBotVDosBypass}