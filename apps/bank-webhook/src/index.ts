import express from 'express';
import webHookRouter from './route/webhookRoute';
import { ROUTE_WEBHOOK } from '@repo/common/route';
import packageJson from '../package.json';
import os from 'os';

require('dotenv').config();
require('dotenv').config({ path: `../../.env` });

const PORT: number = Number(process.env.PORT);

const app = express();
app.use(express.json());

app.use(ROUTE_WEBHOOK, webHookRouter);


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

app.listen(PORT, () => {
    console.log("Bank webhook listening to PORT:", PORT);
});