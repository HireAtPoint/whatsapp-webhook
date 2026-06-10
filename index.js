const express = require('express');
const app = express();
app.use(express.json());

const VERIFY_TOKEN = 'mybot123';
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/mhs1zvotl3sokaxbqr5o1ageju8hvjpi';

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  const body = req.body;
  if (body.object === 'whatsapp_business_account') {
    fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.get('/', (req, res) => res.send('WhatsApp Webhook is running!'));

app.listen(3000, () => console.log('Server running on port 3000'));
