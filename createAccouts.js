const puppeteer = require('puppeteer');
const fs = require('fs');

const launchBotAcc = async () => {
        // prepare for headless chrome
        const browser = await puppeteer.launch({
            args: [
                "--proxy-server=154.37.254.17:8800",
                // "--start-maximized",
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
        const page = (await browser.pages())[0];
        await page.setViewport({
            width: 1920,
            height: 1080,
          });

        await page.waitForTimeout(5000);
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36");

        // Saved cookies reading
        const cookies = fs.readFileSync('httpbin-cookies.json', 'utf8');

        const deserializedCookies = JSON.parse(cookies);
        await page.setCookie(...deserializedCookies);

        for (let index = 10; index < 20; index++) {
            try {
                await page.goto('https://chaturbate.com/accounts/register/');
                await page.waitForTimeout(`${Math.floor((Math.random() * (10-1))+1)}000`);
                const name = `usrCtnd${index+1}`;
                const password = `12345678CuentaUsrCh`;
    
                const json_accounts = fs.readFileSync('storage/cuentas.json', 'utf-8');
                const accountsNew = JSON.parse(json_accounts)

                let newUser = {
                    username: name,
                    password
                }
    
                await page.type('#husername', name);
                await page.waitForTimeout(`${Math.floor((Math.random() * (10-1))+1)}000`);
                await page.type('#hpassword', password);
                await page.waitForTimeout(`${Math.floor((Math.random() * (10-1))+1)}000`);
    
                await page.select('#id_birthday_day', `${Math.floor((Math.random() * (25-1))+1)}`)
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
    
                await page.select('#id_birthday_month', `${Math.floor((Math.random() * (11-1))+1)}`)        
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                
                await page.select('#id_birthday_year', '2000')
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
    
                let gen = [
                    "f",
                    "m",
                    "c",
                    "s"
                ]
                await page.select('#id_gender', `${gen[Math.floor((Math.random() * (3-1))+1)]}`)
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
    
                await page.click('#id_terms');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page .click('#id_privacy_policy');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page .click('#formsubmit');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.goto('https://chaturbate.com/auth/logout/');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Tab');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
                await page.keyboard.press('Enter');
                await page.waitForTimeout(`${Math.floor((Math.random() * (7-1))+1)}000`);
    
                accountsNew.push(newUser);
                const json_accts = JSON.stringify(accountsNew)
                fs.writeFileSync('storage/cuentas.json', json_accts, 'utf-8');
    
            } catch (error) {
                console.log(error.message);
            }

        }

        // Check the result


        // await browser.close();
};

launchBotAcc();