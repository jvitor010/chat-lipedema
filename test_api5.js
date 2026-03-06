const https = require('https');

function testHost(host, id) {
    return new Promise((resolve) => {
        const options = {
            hostname: host,
            port: 443,
            path: `/api/v1/typebots/${id}/published`,
            method: 'GET',
            headers: {
                'Origin': 'https://chat.fluxovitallipedema.top',
                'Accept': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({ host, id, status: res.statusCode, data: data.substring(0, 500) });
            });
        });

        req.on('error', (e) => {
            resolve({ host, error: e.message });
        });

        req.end();
    });
}

async function run() {
    console.log(await testHost('app.ecomtype.io', 'lipedema-sem-complica-es-de76edd'));
}

run();
