// verify-webhook.js
// const fetch = require('node-fetch'); // Ensure node-fetch is available or use native fetch in Node 18+

async function testWebhook() {
    const url = 'http://localhost:3000/api/webhooks/mercadopago?topic=payment&id=123456789'; // Mock ID

    try {
        console.log(`Sending POST request to ${url}...`);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}), // Body is optional if query params are used
        });

        const text = await response.text();
        console.log('Response Status:', response.status);
        console.log('Response Body (Text):', text);

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse JSON response');
        }

        if (response.status === 200 && data.status === 'ok') {
            console.log('SUCCESS: Webhook endpoint reachable and returned 200 OK.');
        } else {
            console.error('FAILURE: Webhook endpoint returned unexpected status or body.');
        }

    } catch (error) {
        console.error('Error testing webhook:', error);
    }
}

testWebhook();
