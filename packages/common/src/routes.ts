export const END_USER_BASE = process.env.END_USER_BASE_URL || 'http://localhost:3000';
export const BANK_WEBHOOK_BASE = process.env.BANK_WEBHOOK_BASE_URL || 'http://localhost:8080';
export const BANK_MOCK_BASE = process.env.BANK_MOCK_BASE_URL || 'http://localhost:8081';
export const BANK_INTERFACE_BASE = process.env.BANK_INTERFACE_BASE_URL  || 'http://localhost:5173';

export const ROUTE_WEBHOOK = '/webhook';
export const ROUTE_TOKEN = '/token';

export const SUB_ROUTE_WITHDRAW = '/withdraw';
export const SUB_ROUTE_DEPOSIT = '/deposit';

export const SUB_ROUTE_GENERATE = '/generate';
export const SUB_ROUTE_TRANSACTION_SUCCESS = '/transactionSuccess';
