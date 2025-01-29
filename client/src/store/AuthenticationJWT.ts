import {create} from "zustand"
import {persist} from "zustand/middleware";
import {encryptData} from "../outils/CryptoLocalStorage.ts";
import ModToken from "../models/users/ModToken.ts";

interface InterfaceTokenStore {
    token: string | null
    setToken: (newToken: ModToken | null) => void
}

export const useAuthenticationJWTStore = create<InterfaceTokenStore>()(
    persist(
        (set) => ({
        token: null,
        setToken: (newToken) => {
            const encryptedToken = encryptData(JSON.stringify(newToken));
            set({ token: encryptedToken });
        },
    }),
    {
      name: "token-store",
    }
))