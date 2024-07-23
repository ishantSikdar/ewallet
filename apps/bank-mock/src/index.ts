import express from 'express';
import ewalletReqRouter from './route/tokenRoute';
import { ROUTE_TOKEN } from '@repo/common/route';
import cors from 'cors';
import os from 'os';
import packageJson from '../package.json';

require('dotenv').config();
require('dotenv').config({ path: `../../.env` });

const PORT: number = Number(process.env.PORT);

const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.BANK_INTERFACE_BASE_URL
}));

app.get('/', async (req, res) => {
    try {
        const memoryUsage = process.memoryUsage();

        const rssMemory = `${(memoryUsage.rss / (1024 * 1024)).toFixed(2)} MB`;
        const heapTotalMemory = `${(memoryUsage.heapTotal / (1024 * 1024)).toFixed(2)} MB`;
        const heapUsedMemory = `${(memoryUsage.heapUsed / (1024 * 1024)).toFixed(2)} MB`;
        const externalMemory = `${(memoryUsage.external / (1024 * 1024)).toFixed(2)} MB`;

        const serverStatus = {
            status: 'running',
            uptime: `${process.uptime()} seconds`,
            memoryUsage: {
                rss: `${rssMemory}`,
                heapTotal: `${heapTotalMemory}`,
                heapUsed: `${heapUsedMemory}`,
                external: `${externalMemory}`
            },
            osInfo: {
                platform: os.platform(),
                release: os.release(),
                cpuArchitecture: os.arch(),
                totalMemory: `${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`,
                freeMemory: `${(os.freemem() / (1024 * 1024)).toFixed(2)} MB`,
                uptime: `${os.uptime()} seconds`
            },
            cors: [
                process.env.BANK_INTERFACE_BASE_URL,
            ],
            nodeVersion: `${process.version}`,
            expressVersion: `${packageJson.dependencies.express}`,
            serverConfiguration: {
                port: PORT
            },
            additionalDependencies: packageJson.dependencies,
        };

        res.status(200).json(serverStatus);
    } catch (error: any) {
        console.error(`Error occurred while fetching server information: ${error}`);
        res.status(500).json({
            message: `Server error: ${error.message}`
        });
    }
});

app.use(ROUTE_TOKEN, ewalletReqRouter);

app.listen(PORT, () => {
    console.log("Bank Mock listening to PORT:", PORT);
});
