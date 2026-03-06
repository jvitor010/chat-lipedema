const https = require('https');

function testHost(host, id) {
    return new Promise((resolve) => {
        https.get(`https://${host}/api/v1/typebots/${id}/published`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({ host, id, status: res.statusCode, data: data.substring(0, 100) });
            });
        }).on('error', (e) => {
            resolve({ host, error: e.message });
        });
    });
}

async function run() {
    const ids = [
        'lipedema-sem-complica-es-de76edd',
        '4366e56049494e5881df9c92ede76edd',  // from screenshot URL
        '4366e5604949494e5881df9c92ede76edd'   // from old index.html
    ];
    for (const id of ids) {
        console.log(await testHost('app.ecomtype.io', id));
    }
}

run();
