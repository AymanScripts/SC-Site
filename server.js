const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('.'));

// Helper function to read inquiries
function readInquiries() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'data', 'inquiries.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write inquiries
function writeInquiries(inquiries) {
    fs.writeFileSync(path.join(__dirname, 'data', 'inquiries.json'), JSON.stringify(inquiries, null, 2));
}

// API endpoint to save a new inquiry
app.post('/api/save-inquiry', (req, res) => {
    try {
        const inquiries = readInquiries();
        inquiries.push(req.body);
        writeInquiries(inquiries);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error saving inquiry:', error);
        res.status(500).json({ error: 'Failed to save inquiry' });
    }
});

// API endpoint to get all inquiries
app.get('/api/get-inquiries', (req, res) => {
    try {
        const inquiries = readInquiries();
        res.json(inquiries);
    } catch (error) {
        console.error('Error getting inquiries:', error);
        res.status(500).json({ error: 'Failed to get inquiries' });
    }
});

// API endpoint to delete an inquiry
app.post('/api/delete-inquiry', (req, res) => {
    try {
        const inquiries = readInquiries();
        inquiries.splice(req.body.index, 1);
        writeInquiries(inquiries);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error deleting inquiry:', error);
        res.status(500).json({ error: 'Failed to delete inquiry' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 