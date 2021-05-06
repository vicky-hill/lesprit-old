const User = require('../../models/User');

module.exports = () => {
    return new User({
        name: 'Kelsey',
        email: 'kelsey@mymail.com',
        password: '1234'
    }).save();
}