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
    const { email, password } = req.body;

    const user = await User.matchPassword(email, password)
    console.log(user);
    


    return res.redirect('/');
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

module.exports = router;