# eWallet System

This is repository contains web softwares for a eWallet system.

System aims to perform operations like a real e-wallet applications like PayTM, i.e, able to transfer funds from one user to another, deposit and withdraw funds from external banks, and track the movement of funds.

Here, I tried to spoof the external bank softwares, i.e, they mimicks like a bank software, but arent, they just play along to complete the flow of the application. 

## Architecture

![alt text](docs/architecture.png)

### Features

  - Add balance into Wallet (Withdraw)
  
    ![alt text](docs/withdraw-architecture.png)

  - Deposit wallet balance into Bank (Deposit)
  
    ![alt text](docs/deposit-architecture.png)

  - P2P Wallet balance transfer
  
    ![alt text](docs/P2PArchitecture.png)

## Quick start

Run the following command to start all applications:

```sh
npm run dev
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps

- `end-user`: [Next.js]() app for end users to use the wallet.
- `merchant-app`: [Next.js]() for registered merchants.
- `bank-webhook`: [Node.js]() app to receive requests from integrated banks.
- `bank-mock`: [Node.js]() app to mimick a bank system.
- `bank-interface`: [React.js]() app to mimick a bank user interface.

### Packages
- `@repo/ui`: [React.js]() component library that can be shared across apps.
- `@repo/common`: Utility folder containing common modules and functions.
- `@repo/db`: Singleton [Prisma]() client.
- `@repo/store`: Centeralised folder for [Recoil]() hooks, atoms and selectors.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).