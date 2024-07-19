import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const key in envConfig) {
        process.env[key] = envConfig[key];
    }
}

console.log("Env loaded", process.env);