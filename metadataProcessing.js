const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();  // Ensure your .env file has the JWT token

function createMetadata(imageHash, igpostId) {
    try {
        const metadata = {
            name: 'IGTokenizer NFT',
            description: `NFT minted after successfully verifying the authority over post ${igpostId.replace("-", " ")}.`,
            image: `ipfs://${imageHash}`
        };
        const metadataPath = `./metadata/${igpostId}.json`;
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        return metadataPath;
    } catch (error) {
        console.error('Error creating metadata:', error);
        throw error;
    }
}


module.exports = { createMetadata };