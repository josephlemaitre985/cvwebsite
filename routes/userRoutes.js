const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password_hash: hashedPassword
        });
        res.status(201).json({ message: 'User created successfully' }); // Envoyez une réponse JSON ici
    } catch (error) {
        res.status(500).json({ message: error.message }); // Assurez-vous que c'est aussi une réponse JSON
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password_hash)) {
            res.status(200).json({
                message: 'Login successful',
                user: { id: user.user_id, username: user.username, email: user.email } // Assurez-vous de renvoyer ces informations
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;