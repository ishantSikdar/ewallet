import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { bankInterfaceStageAtom, menuStatusAtom, screenWidthAtom, sendMoneyInputAtom } from "../atoms/app"

export const useSendMoneyInputState = () => {
    return useRecoilState(sendMoneyInputAtom);
}

export const useValueSendMoneyInput = () => {
    return useRecoilValue(sendMoneyInputAtom);
}

export const useSetSendMoneyInputState = () => {
    return useSetRecoilState(sendMoneyInputAtom);
}

export const useBankAppStageState = () => {
    return useRecoilState(bankInterfaceStageAtom);
}

export const useScreenWidth = () => {
    return useRecoilValue(screenWidthAtom);
}

export const useSetMenuStatus = () => {
    return useSetRecoilState(menuStatusAtom);
}

export const useMenuStatus = () => {
    return useRecoilValue(menuStatusAtom);
}