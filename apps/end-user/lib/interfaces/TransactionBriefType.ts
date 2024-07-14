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
        number: string | null;
    };
}

export interface ContactType {
    id: number;
    number: string | null;
    name: string | null;
    color: string | null;
}

export interface CredentialsType {
    phone: string;
    password: string;
}

export interface SplashType {
    name: string | null;
    number: string | null;
    email: string | null;
    isReady: boolean;
}
