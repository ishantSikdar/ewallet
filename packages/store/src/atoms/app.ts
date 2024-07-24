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

export const screenWidthAtom = atom<number>({
    key: 'screenWidthAtom',
    default: window.innerWidth,
    effects: [
        ({ setSelf }) => {
            const handleResize = () => {
                setSelf(window.innerWidth);
            };

            window.addEventListener('resize', handleResize);

            // Clean up the event listener on unmount
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    ]
});

export const menuStatusAtom = atom<boolean>({
    key: 'menuStatusAtom',
    default: false
})