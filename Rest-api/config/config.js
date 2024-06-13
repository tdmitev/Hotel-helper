const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3001,
        dbURL: 'mongodb://localhost:27017/hotel-manager',
        origin: ['http://localhost:5555', 'http://localhost:4200', 'http://127.0.0.1:5000']
    },
    production: {
        port: process.env.PORT || 3001,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    }
};

module.exports = config[env];