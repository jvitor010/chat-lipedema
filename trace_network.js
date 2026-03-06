const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Catch console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    // Catch failed network requests
    page.on('requestfailed', request => {
        console.log(`Failed Request: ${request.url()} - ${request.failure().errorText}`);
    });

    // Alternatively, just log all requests that match 'api/v1'
    page.on('request', request => {
        if (request.url().includes('api/v1') || request.url().includes('published')) {
            console.log(`API Request sent: ${request.url()}`);
        }
    });

    try {
        await page.goto('https://chat.fluxovitallipedema.top', { waitUntil: 'networkidle2' });
        // Wait a bit to ensure the typebot has time to make its API call
        await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
        console.log('Error navigating:', e);
    }

    await browser.close();
})();
