const puppeteer = require('puppeteer');
const fs = require('fs');
const proxysModels = require('../models/proxys');
const acctModels = require('../models/accounts');
const killBots = require('../models/killBots');

// const launchBotsFollowBypass = async (proxy, id, name_model, username, password, index, idRegisterCompBotContainer, isFollow) => {
    
//     try {
//         process.setMaxListeners(Infinity);
//         const browser = await puppeteer.launch({
//             args: [
//                 `--proxy-server=${proxy}`,
//                 "--start-maximized",
//                 "--disable-web-security",
//                 "--disable-extensions",
//                 "--disable-notifications",
//                 "--ignore-certificate-errors",
//                 "--no-sandbox",
//                 "--disable-gpu",
//                 "--log-level=3",
//                 "--allow-running-insecure-content",
//                 "--no-default-browser-check",
//                 "--no-first-run",
//                 "--disable-blink-features=AutomationControlled",
//                 "excludeSwitches={'enable-automation','ignore-certificate-errors','enable-logging'}"
//             ],
//             headless: false
//         })
//         const browserPID = browser.process().pid
//         const newIdKBot = new killBots({
//             NmrKill: browserPID,
//             nameModel: name_model,
//             acct_id: id,
//             type: 'actsLoguedAndFollow',
//             idRegisterCompBotContainer,
//             proxy
//         })

//         await newIdKBot.save();
//         const page = (await browser.pages())[0];
//         await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
//         const cookies = fs.readFileSync('httpbin-cookies.json', 'utf8');
//         const deserializedCookies = JSON.parse(cookies);
//         await page.setCookie(...deserializedCookies);
//         /////////////////////////////////////////////////////////////////////////////
//         await open_tab('https://chaturbate.com/' , browser);
//         await page.waitForTimeout(20000)
//         await open_tabDos('https://chaturbate.com/auth/login/' , browser, proxy, name_model, username, password, index, isFollow, id);
//         await page.close();
//         let pageDos = (await browser.pages())[0];
//         await pageDos.close();
//     } catch (error) {
//         console.log(error.message)
//     }

// }

const launchBotsFollowBypass = async (proxy, id, name_model, username, password, index, idRegisterCompBotContainer, isFollow, promotionMessage) => {
    
    try {
        process.setMaxListeners(Infinity);
        const browser = await puppeteer.launch({
            args: [
                `--proxy-server=${proxy}`,
                "--start-maximized",
                "--disable-webgl",
                "--disable-plugins",
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
            type: 'actsLoguedAndFollow',
            idRegisterCompBotContainer,
            proxy
        })

        await newIdKBot.save();

        const page = (await browser.pages())[0];

        const random_ua = require('modern-random-ua');
        console.log(random_ua.generate());
        await page.setUserAgent(random_ua.generate());
        await page.emulateTimezone('America/New_York');
        
        /////////////////////////////////////////////////////////////////////////////


        await page.goto('about:blank');
        await page.waitForTimeout(1000);

        await page.goto('https://www.thepornlist.net/');
        await page.waitForTimeout(3000);
  
        // // Obtener las cookies de la página
        const cookies = await page.cookies();
        await page.setCookie(...cookies);

        // const cookies = fs.readFileSync('httpbin-cookies.json', 'utf8');
        // const deserializedCookies = JSON.parse(cookies);
        // await page.setCookie(...deserializedCookies);


        const width = getRandomInt(800, 1200);
        const height = getRandomInt(600, 1000);

        const page3 = await browser.newPage();
        await page3.emulateTimezone('America/New_York');
        await page3.setViewport({ width: width, height: height });
        await page3.goto('https://scrapfly.io/web-scraping-tools/http2-fingerprint/');
        await page3.waitForTimeout(1000);

        const page4 = await browser.newPage();
        await page4.emulateTimezone('America/New_York');
        await page4.setViewport({ width: width, height: height });
        await page4.goto('about:blank');
        await page4.waitForTimeout(5000);

        // Obtener todas las manijas de las pestañas
        const pageHandles = await browser.pages();


        await page4.evaluate(() => {
            const button = document.createElement('button');
            button.textContent = 'Embeber payload';

            button.addEventListener('click', () => {
                newTab = window.open('https://www.chaturbate.com', '_blank');
              });

            document.body.appendChild(button);

            // Simular un clic en el botón después de 10 segundos
            setTimeout(() => {
                button.click();
            }, 5000); // 10 segundos en milisegundos
          });

        await page4.waitForTimeout(12000)

        const pages = await browser.pages();
        const currentPage = pages[3];
        await currentPage.waitForTimeout(5000);
        await page3.emulateTimezone('America/New_York');
        //console.log("tabs number " + pages.length)

        
        /** 
        //console.log("doing the iteration");
        for (let i = 0; i < 13; i++) {
            await currentPage.keyboard.press('Tab');
            await currentPage.waitForTimeout(2000); // Esperar un breve intervalo entre cada pulsación
            console.log("iteration " + i)
            await currentPage.keyboard.press('Space');
          }
          */

          await currentPage.evaluate(() => {
            document.addEventListener('mousedown', e => {
              const marker = document.createElement('div');
              marker.style.width = '10px';
              marker.style.height = '10px';
              marker.style.background = 'red';
              marker.style.position = 'absolute';
              marker.style.top = e.clientY + 'px';
              marker.style.left = e.clientX + 'px';
              document.body.appendChild(marker);
        
              setTimeout(() => {
                marker.remove();
              }, 5000); // Elimina el marcador después de 1 segundo
            });
          });

          const x = 62; 
          const y = 280; 

          console.log("clicking web")
          await currentPage.mouse.click(x, y);

          await currentPage.waitForTimeout(5000);

          await currentPage.evaluate(() => {
            document.querySelector('#close_entrance_terms').click();
        });

        await currentPage.waitForTimeout(5000);


        const page5 = await browser.newPage();
        await page5.emulateTimezone('America/New_York');
        await page5.setViewport({ width: width, height: height });
        await page5.goto('https://chaturbate.com/auth/login/');
        await page5.waitForTimeout(5000);

         
        await page5.waitForTimeout(8000)

        await page5.evaluate((valor) => {
            const elemento = document.getElementById('id_username');
            if (elemento) {
                elemento.value = valor;
            }
        }, username);

        //await page5.keyboard.type(username)
        //await page5.keyboard.press('Tab')
        await page5.waitForTimeout(2000)
        //await page5.keyboard.type(password)

        await page5.evaluate((valor) => {
            const elemento = document.getElementById('id_password');
            if (elemento) {
                elemento.value = valor;
            }
        }, password);

        await page5.waitForTimeout(3000)
        await page5.keyboard.press('Tab')
        await page5.waitForTimeout(2000)
        await page5.keyboard.press('Tab')
        await page5.waitForTimeout(2000)
        await page5.keyboard.press('Enter')
        await page5.waitForTimeout(8000)

        //closing the tabs
        await page4.close();
        await page3.waitForTimeout(2000)
        await page3.close();
        await page.waitForTimeout(2000)
        await page.close();

        await page5.goto(`https://chaturbate.com/tipping/free_tokens/`);
        await page5.waitForTimeout(4000)
        if (await page5.url() === 'https://chaturbate.com/auth/login/?next=/tipping/free_tokens/') {
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

        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        
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

        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////

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
            let data = await acctModels.findOne({_id: id})
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

module.exports = {launchBotsFollowBypass, botDebug, vDosBot}