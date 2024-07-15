import { atom } from "recoil";

export const appLoadingAtom = atom({
    key: 'appLoadingAtom',
})

export const sendMoneyInputAtom = atom({
    key: 'sendMoneyInputAtom',
    default: ''
});