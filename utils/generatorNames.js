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
        const page = (await browser.pages())[0];

        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36");
        const dataName = []
        const nameFile="storage/nameArray.txt"
        const files = fs.existsSync(nameFile)
        if (files) {
            fs.unlinkSync(`${nameFile}`)
        }
        for (let index = 0; index < 20; index++) {
            await page.goto('https://generadordenombres.online/empresas/#');
            const name = await page.evaluate(() => document.querySelector('.resultadoGenerado').innerText);
            const nameCmp=name.replace(/ S.L./g, `${Math.floor((Math.random() * (100-1))+1)}`)
            const nameCmp2=nameCmp.replace(/ S.A./g, `${Math.floor((Math.random() * (100-1))+1)}`)
            const usernameF=nameCmp2.replace(/-/g, '')
            const usernamea=usernameF.replace(/ñ/g, 'n')
            const username=usernamea.toLowerCase()

            dataName.push({username, password: '12345678CuentaUsrCh'})
        }
        console.log(dataName);
        fs.writeFileSync(nameFile, JSON.stringify(dataName))
        console.log("archivo creado");
        await browser.close();

};

module.exports = {generatorNames}