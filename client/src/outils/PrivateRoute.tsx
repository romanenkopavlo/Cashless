import {useAuthenticationJWTStore} from "../store/AuthenticationJWT.ts";
import {Navigate, Outlet, useNavigate} from "react-router";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {decryptData} from "./CryptoLocalStorage.ts";
import {useEffect} from "react";

interface CustomJwtPayload extends JwtPayload {
    exp: number;
}

const getTokenExpirationTime = (token: string): number | null => {
    try {
        const decoded = jwtDecode<CustomJwtPayload>(token);
        return decoded.exp * 1000;
    } catch (error) {
        console.error("Failed to decode token: ", error);
        return null;
    }
};

export const PrivateRoute = () => {
    const {token} = useAuthenticationJWTStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const decryptedToken = decryptData(token);
            const parsedDecryptedToken = JSON.parse(decryptedToken);
            const jwtToken = parsedDecryptedToken.token;

            const expirationTime = getTokenExpirationTime(jwtToken);
            if (expirationTime) {
                const currentTime = Date.now();
                const timeUntilExpiration = expirationTime - currentTime;

                if (timeUntilExpiration <= 0) {
                    console.log("Token already expired. Redirecting...");
                    localStorage.removeItem("token-store");
                    navigate("/login", {replace: true});
                    return;
                }
                console.log(`Token will expire in ${timeUntilExpiration}ms`);
                const timeout = setTimeout(() => {
                    console.log("Token expired. Redirecting to login...");
                    localStorage.removeItem("token-store");
                    navigate("/login", {replace: true});
                }, timeUntilExpiration);
                return () => clearTimeout(timeout);
            }
        } else {
            console.log("No token found. Redirecting to login...");
            localStorage.removeItem("token-store");
            navigate("/login", {replace: true});
        }
    }, [token, navigate]);

    if (!token) {
        localStorage.removeItem("token-store");
        return <Navigate to={"/login"} replace/>;
    }

    return <Outlet/>;
}