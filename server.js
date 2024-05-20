const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const tipsFilePath = path.join(__dirname, 'tips.json');
const gamesFilePath = path.join(__dirname, 'games.json');

let tips = [];
if (fs.existsSync(tipsFilePath)) {
    const data = fs.readFileSync(tipsFilePath);
    tips = JSON.parse(data);
}

let games = {};
if (fs.existsSync(gamesFilePath)) {
    const data = fs.readFileSync(gamesFilePath);
    games = JSON.parse(data);
}

app.post('/submit-tip', (req, res) => {
    const tip = req.body;
    const existingTipIndex = tips.findIndex(t => t.participant === tip.participant && t.match === tip.match);

    if (existingTipIndex !== -1) {
        if (tip.override) {
            tips[existingTipIndex] = tip;
            fs.writeFileSync(tipsFilePath, JSON.stringify(tips, null, 2));
            return res.json({ tips: tips, message: 'Tipp wurde aktualisiert.' });
        } else {
            return res.status(400).json({ error: 'Du hast bereits einen Tipp für dieses Spiel abgegeben. Möchtest du ihn ändern?', allowOverride: true });
        }
    }

    tips.push(tip);
    fs.writeFileSync(tipsFilePath, JSON.stringify(tips, null, 2));
    res.json({ tips: tips, message: 'Tipp wurde abgegeben.' });
});

app.get('/tips', (req, res) => {
    res.json({ tips: tips });
});

app.get('/games', (req, res) => {
    res.json(games);
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
