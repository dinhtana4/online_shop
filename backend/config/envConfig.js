require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    URL: process.env.URL,
    JWT_SECRET: process.env.JWT_SECRET,
    PAGE_SIZE: process.env.PAGE_SIZE
}