const https = require('https');

function testHost(host, path, headers) {
    return new Promise((resolve) => {
        const options = {
            hostname: host,
            port: 443,
            path: path,
            method: 'GET',
            headers: headers || { 'Accept': 'application/json' }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({ host, path, status: res.statusCode, data: data.substring(0, 500) });
            });
        });

        req.on('error', (e) => {
            resolve({ host, path, error: e.message });
        });

        req.end();
    });
}

async function run() {
    const tests = [
        { host: 'app.ecomtype.io', path: '/api/v1/typebots/lipedema-sem-complica-es-de76edd/published' },
        { host: 'ecomtype.io', path: '/api/v1/typebots/4366e56049494e5881df9c92ede76edd/published' },
        { host: 'viewer.ecomtype.io', path: '/api/v1/typebots/4366e56049494e5881df9c92ede76edd/published' }
    ];
    for (const t of tests) {
        console.log(await testHost(t.host, t.path));
    }
}

run();
