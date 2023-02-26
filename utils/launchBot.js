const puppeteer = require('puppeteer');
const fs = require('fs');
const proxysModels = require('../models/proxys');
const acctModels = require('../models/accounts');
const killBots = require('../models/killBots');
const axios = require('axios');
const { execSync } = require('child_process');


// const launchBotVDos = async (proxy, id, name_model, username, password, index, idRegisterCompBotContainer) => {
    
//     process.setMaxListeners(Infinity);
//     const browser = await puppeteer.launch({
//         args: [
//             `--proxy-server=${proxy}`,
//             "--start-maximized",
//             "--disable-web-security",
//             "--disable-extensions",
//             "--disable-notifications",
//             "--ignore-certificate-errors",
//             "--no-sandbox",
//             "--disable-gpu",
//             "--log-level=3",
//             "--allow-running-insecure-content",
//             "--no-default-browser-check",
//             "--no-first-run",
//             "--disable-blink-features=AutomationControlled",
//             "excludeSwitches={'enable-automation','ignore-certificate-errors','enable-logging'}"
//         ],
//         headless: false
//     })
//     const browserPID = browser.process().pid
//     const newIdKBot = new killBots({
//         NmrKill: browserPID,
//         nameModel: name_model,
//         acct_id: id,
//         type: 'actsLogued',
//         idRegisterCompBotContainer,
//         proxy
//     })
    
//     const dataKIll = await newIdKBot.save();
    
//     const page = (await browser.pages())[0];
//     await page.setDefaultNavigationTimeout(0);
//     await page.setViewport({
//         width: 1920,
//         height: 947,
//     });
//     await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41");

//     const cookies = fs.readFileSync('httpbin-cookies.json', 'utf8');
//     const deserializedCookies = JSON.parse(cookies);
//     await page.setCookie(...deserializedCookies);
//     await page.waitForTimeout(2000)
//     try {
//         await page.goto('https://chaturbate.com/auth/login/');
//         await page.waitForTimeout(8000)
//         await page.keyboard.type(username)
//         await page.keyboard.press('Tab')
//         await page.waitForTimeout(8000)
//         await page.keyboard.type(password)
//         await page.waitForTimeout(2000)
//         await page.keyboard.press('Tab')
//         await page.waitForTimeout(2000)
//         await page.keyboard.press('Tab')
//         await page.waitForTimeout(2000)
//         await page.keyboard.press('Enter')
//         await page.waitForTimeout(8000)
//         await page.goto(`https://chaturbate.com/tipping/free_tokens/`);
//         await page.waitForTimeout(2000)
//         if (await page.url() === 'https://chaturbate.com/auth/login/?next=/tipping/free_tokens/') {
//             console.log("###########################################");
//             console.log("username:", username);
//             console.log("proxy:", proxy);
//             console.log("Bot:", index);
//             console.log("cuenta no logueada");  
//             console.log("###########################################"); 
//             // await page.screenshot({path: `storage/${username}.jpg`})
//             const dataUsr = await acctModels.findOne({_id: id})
//             dataUsr.isUsed=false
//             const dataProxy = await proxysModels.findOne({proxy})
//             if (!dataProxy) {
//                 return console.log("proxy no encontrado");
//             }
//             dataProxy.Nusers--
//             if (dataProxy.Nusers <= 10) {
//                 dataProxy.isFull=false
//             }
//             // await dataUsr.save();
//             // await dataProxy.save();
//             // await killBots.deleteOne({_id: dataKIll._id})
//             // await browser.close()
//             return;
//         }
//         await page.waitForTimeout(1000)
//         await page.goto(`https://chaturbate.com/${name_model}`);
//         console.log("=====================");
//         console.log("username:", username);
//         console.log("proxy:", proxy);
//         console.log("Bot:", index);
//         console.log("login exitoso");
//         console.log("dentro del streaming");
//         console.log("=====================");
//     } catch (error) {
//         console.log(error.message)
//     }
// }
const launchBotVDos = async (proxy, id, name_model, username, password, index, idRegisterCompBotContainer) => {
    
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

const vDosBot = async (name_model, proxy, idRegisterCompBotContainer) => {
    try {
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
            // const dataUsr = await acctModels.findOne({_id: id})
            // dataUsr.isUsed=false
            // const dataProxy = await proxysModels.findOne({proxy})
            // if (!dataProxy) {
            //     return console.log("proxy no encontrado");
            // }
            // dataProxy.Nusers--
            // if (dataProxy.Nusers <= 10) {
            //     dataProxy.isFull=false
            // }
            // await dataUsr.save();
            // await dataProxy.save();
            // await killBots.deleteOne({_id: dataKIll._id})
            // await browser.close()
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

const getD = async (pid) => {
    let command = null;
    if (process.platform === "win32") {
        command = `wmic process where processid=${pid} get caption, processid, workingsetsize`;
        try {
            // Ejecuta el comando de forma síncrona y obtiene la salida
            const std = await execSync(command);
            const stdout = std.toString().trim();
            let data=stdout.split(" ");
            if (data.length === 1) {
                // console.log("err", data);
                await killBots.findOneAndUpdate({ NmrKill: pid }, { NmrKill: 0 });
            }
        } catch (error) {
            console.error(error);
        }
    }else{
        // console.log('object');
        command = `ps -p ${pid}`;
        try {
            // Ejecuta el comando de forma síncrona y obtiene la salida
            const std = await execSync(command);
            console.log('find');
        } catch (error) {
            // console.error(`Error al buscar el proceso: ${error}`);
            await killBots.findOneAndUpdate({NmrKill: pid }, { NmrKill: 0 });
        }
    }
}

const verifyBotKill = async () => {
    const data = await killBots.find()
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        await getD(element.NmrKill)
    }

    const dataF = await killBots.find({NmrKill: 0})
    for (let i = 0; i < dataF.length; i++) {
        const element = dataF[i];
        const dataP = await proxysModels.findOne({proxy: element.proxy})
        if(element.type === "actsLogued"){
            if (!dataP.Nusers) {
                return;
            }
            dataP.Nusers--
            if (dataP.Nusers <= 10) {
                dataP.isFull=false
            }
            await dataP.save()
        }else{
            if (!dataP.NusersAny) {
                return;
            }
            dataP.NusersAny--
            if (dataP.NusersAny <= 30) {
                dataP.isFullAny=false
            }
            await dataP.save()
        }
        await killBots.deleteOne({_id: element._id})
        const dataAxi = await axios.post(`http://localhost:3020/api/tableLogLaunch/verifyKill/${element.idRegisterCompBotContainer}`)
        console.log(dataAxi.data);
    }
}

module.exports = {launchBotVDos, botDebug, verifyBotKill, vDosBot}