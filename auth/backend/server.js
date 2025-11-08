const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-APP', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, trim: true, default: '' },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, default: '' },
    dob: { type: Date, required: false },
    role: { type: String, enum: ['candidate', 'admin'], default: 'candidate', required: true },
    organization: { type: String, trim: true, default: '', required: function () { return this.role === 'admin'; } },
    googleId: { type: String, unique: true, sparse: true, default: null },
    tenth_highSchool: { type: String, trim: true, default: '' },
    tenth_totalMarks: { type: String, trim: true, default: '' },
    tenth_percentage: { type: String, trim: true, default: '' },
    twelfth_highSchool: { type: String, trim: true, default: '' },
    twelfth_totalMarks: { type: String, trim: true, default: '' },
    twelfth_percentage: { type: String, trim: true, default: '' },
    college_name: { type: String, trim: true, default: '' },
    university_name: { type: String, trim: true, default: '' },
    branch: { type: String, trim: true, default: '' },
    specialization: { type: String, trim: true, default: '' },
    graduation_year: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                user.googleId = profile.id;
                await user.save();
            } else {
                user = new User({
                    googleId: profile.id,
                    firstName: profile.name?.givenName || '',
                    lastName: profile.name?.familyName || '',
                    email: profile.emails[0].value,
                    role: 'candidate',
                    passwordHash: '',
                    dob: null
                });
                await user.save();
            }
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        const token = jwt.sign({
            id: req.user._id,
            email: req.user.email,
            role: req.user.role
        }, JWT_SECRET, { expiresIn: '24h' });

        res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
    });

// Your existing routes (signup, login, education update, profile) remain unchanged.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
