//Load environments
require('dotenv').config();

module.exports = {
    NAME: process.env.DB_NAME,
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD
};