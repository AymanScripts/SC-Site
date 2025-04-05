const fs = require('fs');
const path = require('path');

// Read the inquiries from localStorage
const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');

// Write to the data file
fs.writeFileSync(
    path.join(__dirname, 'data', 'inquiries.json'),
    JSON.stringify(inquiries, null, 2)
);

console.log('Inquiries updated successfully!'); 