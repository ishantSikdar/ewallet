import { atom } from "recoil";

export const userInitStateAtom = atom({
    key: "userInitStateAtom",
    default: {
        isReady: true,
        email: "",
        number: "",
        name: "",
        lockEmail: false,
        lockNumber: false,
    }
});

