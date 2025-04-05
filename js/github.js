// GitHub configuration
const REPO_OWNER = 'AymanScripts';
const REPO_NAME = 'SC-Site';
const FILE_PATH = 'data/inquiries.json';

// Function to load inquiries from GitHub
async function loadInquiries() {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${FILE_PATH}`);
        
        if (!response.ok) {
            // File doesn't exist yet, return empty array
            return [];
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading inquiries:', error);
        return [];
    }
}

// Function to save inquiries to GitHub
async function saveInquiries(inquiries) {
    try {
        // For now, we'll just store in localStorage as a fallback
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        return true;
    } catch (error) {
        console.error('Error saving inquiries:', error);
        return false;
    }
} 