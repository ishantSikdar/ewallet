import { atom } from "recoil";

export const userInitStateAtom = atom({
    key: "userInitStateAtom",
    default: {
        isReady: false,
        email: "",
        number: "",
        name: "",
        lockEmail: false,
        lockNumber: false,
    }
});

