const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost/omnistack', { useNewUrlParser: true });
