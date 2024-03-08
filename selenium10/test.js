const {Builder,Browser, By, Key, until} = require('selenium-webdriver')

const fs = require('fs').promises

const path = require('path')

async function runTest() {

    const driver = await new Builder().forBrowser(Browser.FIREFOX).build()

    try{

        const filePath = path.join(__dirname, 'config.json')
        const { productName, url } = await fs.readFile(filePath, 'utf-8').then(JSON.parse)

        await driver.get(url)
        const searchBox = await driver.findElement(By.xpath('//*[@id="gh-ac"]'))

        await searchBox.sendKeys(productName, Key.RETURN)

        const searchResults = await driver.findElements(By.className('s-item'))

        console.log(`${productName} találatok száma / oldal : ${searchResults.length}`) 

    

        const searchResultFilter = searchResults.filter ( async (el) => {
            const attributeValue = await el.getAttribute('data-viewport')
            console.log(attributeValue)
            if(attributeValue){
            
                
                return el}
        })

        console.log(searchResultFilter.length)

        let idCounter = 1

        const dataToWrite = {
            id: idCounter,
            productName,
            url,
            searchResults: searchResultFilter.length,
            key: productName
        }

        await fs.writeFile('result.json', JSON.stringify(dataToWrite, null, 2))

        if (searchResultFilter.length < 65){
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