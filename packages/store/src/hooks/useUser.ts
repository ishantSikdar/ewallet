import { useRecoilState } from "recoil"
import { userInitStateAtom } from "../atoms/user"

export const useUserState = () => {
    return useRecoilState(userInitStateAtom);
}