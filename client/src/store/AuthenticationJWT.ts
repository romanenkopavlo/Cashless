// import {create} from "zustand"
// import {persist} from "zustand/middleware";
// import Token from "../models/users/Token.ts";
// import {getDecodedToken} from "../utils/TokenDecodage.ts";
//
// interface InterfaceTokenStore {
//     token: string | null
//     setToken: (newToken: Token | null) => void
// }

import {create} from "zustand";
import Token from "../models/users/Token.ts";

interface InterfaceTokenStore {
    accessToken: Token | null
    setAccessToken: (newToken: Token | null ) => void
}
export const useAuthenticationJWTStore = create<InterfaceTokenStore>()(
    (set) => ({
        accessToken: null,
        setAccessToken: (token) => set({accessToken: token}),
    })
)


// export const useAuthenticationJWTStore = create<InterfaceTokenStore>()(
//     persist(
//         (set) => ({
//             token: null,
//             setToken: (newToken) => {
//                 set({ token: newToken?.accessToken });
//             },
//         }),
//         {
//             name: "access-token",
//         }
//     ))

// export const useAuthenticationJWTStore = create<InterfaceTokenStore>((set) => ({
//     token: null,
//     setToken: (newToken) => {
//         if (newToken) {
//             try {
//                 const accessToken = newToken?.accessToken
//                 const decodedToken = getDecodedToken(accessToken)
//
//                 const userData = {
//                     // @ts-ignore
//                     id: decodedToken.id,
//                     // @ts-ignore
//                     username: decodedToken.username,
//                     // @ts-ignore
//                     role: decodedToken.role,
//                 };
//                 localStorage.setItem("user-data", JSON.stringify(userData));
//             } catch (error) {
//                 console.error("Failed to decode token:", error);
//             }
//         } else {
//             localStorage.removeItem("user-data");
//         }
//
//         set({ token: newToken });
//     },
// }));