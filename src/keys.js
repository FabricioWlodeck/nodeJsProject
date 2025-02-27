const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(".env");
const configResult = dotenv.config({ path: envPath });

if (configResult.error) {
    console.error(`Failed to load environment variables. Ensure the .env file exists at ${envPath}.`);
    console.error(configResult.error.message);
    process.exit(1); // Detiene la ejecución si hay un error crítico
}

module.exports = {
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'default_db',
    }
};