const router = require('express').Router()

const path = require('path');
const root = path.join(__dirname, '..', 'public')

// Serve HTML file at root
router.get('/', (req, res) => {
    res.sendFile(path.join('index.html', { root }));
});

module.exports = router