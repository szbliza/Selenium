const {Builder,Browser, By, Key, until} = require('selenium-webdriver')

const fs = require('fs').promises

const path = require('path')

async function runTest() {

    const driver = await new Builder().forBrowser(Browser.FIREFOX).build()

    try{

        const filePath = path.join(__dirname, 'config.json')
        const { password, url, productName } = await fs.readFile(filePath, 'utf-8').then(JSON.parse)

        await driver.get(url)
        const searchBox = await driver.findElement(By.xpath('//*[@id="password"]'))

        await searchBox.sendKeys(password, Key.RETURN)

       

        // const check = await driver.findElement(By.xpath('//input[@name="submitted"]'))
        // await driver.wait(5000)
        // await check.click()

        // const next = await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/div[2]/button[2]'))
        // await next.click()
        // const understood = await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div/div[2]/button[2]'))
        // await understood.click()
        
        const searchResults = await driver.findElements(By.className('MuiPaper-root'))


        console.log(`${productName} találatok száma / oldal : ${searchResults.length}`) 


        let idCounter = 1

        const dataToWrite = {
            id: idCounter,
            productName,
            url,
            searchResults: searchResults.length,
            key: productName
        }

        await fs.writeFile('result.json', JSON.stringify(dataToWrite, null, 2))

        if (searchResults.length < 65){
            hibajegyId = 0
            const errorMessage = ` Hibajegy id: ${hibajegyId} tesztId: ${idCounter} product: ${productName} datum: ${new Date().toISOString()} Tesztelo: Liza `

            await fs.writeFile('hibajegy.txt', errorMessage)

            hibajegyId ++
        }



    }catch(error){
        console.log(error)
    }finally {

        setTimeout (async () => {
            await driver.quit()
        }, 6000)
    }

}

runTest()