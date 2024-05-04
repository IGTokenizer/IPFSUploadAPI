const express = require('express');
const { addTextAndOverlay, uploadToIPFS } = require('./imageProcessing'); // Assuming you moved the functions to imageProcessing.js
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// POST endpoint to create NFT image and upload to IPFS
app.post('/process-image', async (req, res) => {
    try {
        const { ownerWallet, igpostId } = req.body;
        if (!ownerWallet || !igpostId) {
            return res.status(400).send({ error: 'Missing required parameters: ownerWallet or igpostId' });
        }

        const imagePath = await addTextAndOverlay('background.jpg', ownerWallet, igpostId);
        const ipfsResult = await uploadToIPFS(imagePath);
        
        res.send({
            message: 'Image processed and uploaded successfully',
            data: ipfsResult
        });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send({ error: 'Failed to process image and upload to IPFS' });
    }
});

// POST endpoint to process metadata and upload to IPFS
app.post('/process-metadata', async (req, res) => {
    try {
        const { imageHash, igpostId } = req.body;
        if (!imageHash || !igpostId) {
            return res.status(400).send({ error: 'Missing required parameters: hash of the image or igpostId' });
        }

        const imagePath = await createMetadata(imageHash, igpostId);
        const ipfsResult = await uploadToIPFS(imagePath);
        
        res.send({
            message: 'Image processed and uploaded successfully',
            data: ipfsResult
        });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send({ error: 'Failed to process image and upload to IPFS' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

