import {jwtDecode} from "jwt-decode";
import User from "../models/users/User.ts";

export const getTokenExpirationTime = (token: string): number | null => {
    try {
        // @ts-ignore
        return getDecodedToken(token)?.exp * 1000;
    } catch (error) {
        console.log("Failed to decode token");
        return null;
    }
};

export const getDecodedToken = (token: string | null | undefined): User | null => {
    try {
        // @ts-ignore
        return jwtDecode<User>(token)
    } catch (error) {
        console.log("Failed to decode token");
        return null
    }
}