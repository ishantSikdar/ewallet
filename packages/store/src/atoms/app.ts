import { atom } from "recoil";

export const appLoadingAtom = atom({
    key: 'appLoadingAtom',
})

export const sendMoneyInputAtom = atom({
    key: 'sendMoneyInputAtom',
    default: ''
});

export const bankInterfaceStageAtom = atom({
    key: 'bankInterfaceStageAtom',
    default: 0
})