const https = require('https');

https.get('https://chat.chatecom.me/api/v1/typebots/lipedema-sem-complica-es-de76edd/published', res => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => {
        try {
            const data = JSON.parse(body);
            const avatarUrl = data.typebot?.theme?.chat?.hostAvatar?.url;
            console.log('Avatar URL:', avatarUrl);
            console.log('Theme:', JSON.stringify(data.typebot?.theme, null, 2));
        } catch (e) {
            console.log(e);
        }
    });
});
