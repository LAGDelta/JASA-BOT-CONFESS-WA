const twilio = require('twilio');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID'; // Ganti dengan Account SID dari Twilio
const authToken = 'YOUR_TWILIO_AUTH_TOKEN'; // Ganti dengan Auth Token dari Twilio
const client = new twilio(accountSid, authToken);

app.use(express.urlencoded({ extended: false }));

app.post('/whatsapp', (req, res) => {
    const { From, Body } = req.body;
    
    if (Body.startsWith('!confess')) {
        const confession = Body.slice(8).trim();
        const confessionNumber = 'YOUR_CONFESSION_NUMBER'; // Ganti dengan nomor yang akan menerima pengakuan
        
        client.messages.create({
            body: `Confession from an anonymous user: ${confession}`,
            from: 'whatsapp:+YOUR_TWILIO_NUMBER', // Ganti dengan nomor Twilio
            to: `whatsapp:${confessionNumber}`
        })
        .then(() => {
            client.messages.create({
                body: 'Your confession has been sent anonymously!',
                from: 'whatsapp:+YOUR_TWILIO_NUMBER',
                to: From
            });
        })
        .catch(err => console.error(err));
    }

    res.send('Message received');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
