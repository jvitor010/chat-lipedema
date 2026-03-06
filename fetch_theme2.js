const https = require('https');
const fs = require('fs');
https.get('https://chat.chatecom.me/api/v1/typebots/lipedema-sem-complica-es-de76edd/published', res => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
        fs.writeFileSync('theme.json', body);
    });
});
