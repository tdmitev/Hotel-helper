const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Home Page'));
router.get('/menu', (req, res) => res.send('Menu Page'));

module.exports = router;