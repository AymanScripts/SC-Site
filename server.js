const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Get inquiries
app.get('/api/inquiries', (req, res) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', 'inquiries.json'), 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.json([]);
    }
});

// Save inquiries
app.post('/api/inquiries', (req, res) => {
    try {
        const inquiries = req.body;
        fs.writeFileSync(path.join(__dirname, 'data', 'inquiries.json'), JSON.stringify(inquiries, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save inquiries' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 