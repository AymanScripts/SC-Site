// GitHub API configuration
const GITHUB_TOKEN = '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'; // Replace with your GitHub Personal Access Token
const REPO_OWNER = 'aymanscripts'; // Replace with your GitHub username
const REPO_NAME = 'SC-Site'; // Replace with your repository name
const FILE_PATH = 'data/inquiries.json';

// Function to load inquiries from GitHub
async function loadInquiries() {
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (response.status === 404) {
            // File doesn't exist yet, return empty array
            return [];
        }

        const data = await response.json();
        const content = atob(data.content);
        return JSON.parse(content);
    } catch (error) {
        console.error('Error loading inquiries:', error);
        return [];
    }
}

// Function to save inquiries to GitHub
async function saveInquiries(inquiries) {
    try {
        // First, get the current file SHA if it exists
        let sha = null;
        try {
            const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                sha = data.sha;
            }
        } catch (error) {
            console.log('File does not exist yet, will create new file');
        }

        // Create or update the file
        const content = btoa(JSON.stringify(inquiries, null, 2));
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update inquiries',
                content: content,
                sha: sha
            })
        });

        if (!response.ok) {
            throw new Error('Failed to save inquiries');
        }

        return true;
    } catch (error) {
        console.error('Error saving inquiries:', error);
        return false;
    }
} 