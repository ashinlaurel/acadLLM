const User = require('../models/User');

exports.register = async (req, res) => {
    const { email, password, firstName, lastName, phone, profilePicture, bio } = req.body;
    try {
        const user = await User.create({ email, password, firstName, lastName, phone, profilePicture, bio });
        console.log(user);

        const { accessToken } = await user.getJwtToken();
        res.status(201).json({ user, accessToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'This email is not registered' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        user.password = undefined;
        const { accessToken } = await user.getJwtToken();
        res.status(200).json({ user, accessToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.me = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
}
