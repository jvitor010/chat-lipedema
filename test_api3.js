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
                resolve({ host, id, status: res.statusCode, headers: res.headers, data: data.substring(0, 500) });
            });
        });

        req.on('error', (e) => {
            resolve({ host, error: e.message });
        });

        req.end();
    });
}

async function run() {
    const ids = [
        'lipedema-sem-complica-es-de76edd',
        '4366e56049494e5881df9c92ede76edd',
        '4366e5604949494e5881df9c92ede76edd'
    ];
    for (const id of ids) {
        console.log(await testHost('app.ecomtype.io', id));
    }
}

run();
