import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { sendMoneyInputAtom } from "../atoms/app"

export const useSendMoneyInputState = () => {
    return useRecoilState(sendMoneyInputAtom);
}

export const useValueSendMoneyInput = () => {
    return useRecoilValue(sendMoneyInputAtom);
}

export const useSetSendMoneyInputState = () => {
    return useSetRecoilState(sendMoneyInputAtom);
}