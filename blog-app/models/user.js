const {createHmac, randomBytes} = require('crypto');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    profileImageURL: {
       type: String,
       default: '/images/default.webp'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
       
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');
    
    this.salt = salt;
    this.password = hashedPassword;
    
    next();
});

userSchema.static('matchPassword', async function(email, password) {
    const user = await this.findOne({ email})
    if (!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    if (hashedPassword !== userProvidedHash) 
        throw new Error('Invalid password');
    return user

}) 

const User = model('User', userSchema);
module.exports = User;