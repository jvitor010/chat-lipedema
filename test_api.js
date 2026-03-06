const https = require('https');

function testHost(host) {
    return new Promise((resolve) => {
        https.get(`https://${host}/api/v1/typebots/lipedema-sem-complica-es-de76edd/published`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({ host, status: res.statusCode, data: data.substring(0, 100) });
            });
        }).on('error', (e) => {
            resolve({ host, error: e.message });
        });
    });
}

async function run() {
    const hosts = ['app.ecomtype.io', 'viewer.ecomtype.io', 'api.ecomtype.io', 'ecomtype.io', 'typebot.io'];
    for (const host of hosts) {
        console.log(await testHost(host));
    }
}

run();
