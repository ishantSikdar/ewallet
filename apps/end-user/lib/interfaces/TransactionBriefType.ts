export interface TransactionsBriefType {
    id: number;
    timestamp: string;
    status: string;
    amount: number;
}


export interface P2PTransferType {
    id: number,
    amount: number;
    isReceiver: boolean,
    timestamp: string;
    user: {
        name: string | null;
        number: string;
    };
}

export interface ContactType {
    id: number;
    number: string;
    name: string | null;
}
