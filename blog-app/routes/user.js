const {Router} = require('express');
const User = require('../models/user');

const router = Router();

router.get('/signin', (req,res) => {
    return res.render('signin');
});

router.get('/signup', (req,res) => {
    return res.render('signup');
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await User.matchPasswordAndGenerateToken(email, password)
        console.log(token);

        return res.cookie('token', token).redirect('/');
    } catch (error) {
        console.error('Signin error:', error);
        return res.status(401).render('signin', { error: 'Invalid email or password' });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        // Basic validation
        if (!fullName || !email || !password) {
            return res.status(400).render('signup', { 
                error: 'All fields are required' 
            });
        }
        
        await User.create({
            fullName,
            email,
            password,
        });
        
        return res.redirect('/');
    } catch (error) {
        console.error('Signup error:', error);
        
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).render('signup', { 
                error: 'Email already exists' 
            });
        }
        
        return res.status(500).render('signup', { 
            error: 'Something went wrong. Please try again.' 
        });
    }
});

router.get('/logout', (req, res) => {
    return res.clearCookie('token').redirect('/');
});
module.exports = router;