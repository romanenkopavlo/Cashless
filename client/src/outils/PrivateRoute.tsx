import {useAuthenticationJWTStore} from "../store/AuthenticationJWT.ts";
import {Navigate, Outlet, useNavigate} from "react-router";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {decryptData} from "./CryptoLocalStorage.ts";
import {useEffect} from "react";
import {GetNewAccessToken} from "../services_REST/serveur/GetNewAcessToken.ts";

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
    const {token, setToken} = useAuthenticationJWTStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            console.log("non decrypted token: " + token)
            const decryptedToken = decryptData(token);
            console.log("decrypted token " + decryptedToken)
            const parsedDecryptedToken = JSON.parse(decryptedToken);
            const jwtToken = parsedDecryptedToken.accessToken;

            const expirationTime = getTokenExpirationTime(jwtToken);
            if (expirationTime) {
                const currentTime = Date.now();
                const timeUntilExpiration = expirationTime - currentTime;

                console.log(`Token will expire in ${timeUntilExpiration}ms`);
                const timeout = setTimeout(() => {
                    console.log("Access token expired. Refreshing...")
                    GetNewAccessToken()
                        .then((token) => {
                            if (token != null) {
                                console.log(token)
                                setToken(token)
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            console.log(error.message)
                        })
                }, timeUntilExpiration);
                return () => clearTimeout(timeout);
            }
        } else {
            console.log("No access token found. Redirecting to login page...");
            navigate("/login", {replace: true});
        }
    }, [token, navigate]);

    if (!token) {
        localStorage.removeItem("token-store");
        return <Navigate to={"/login"} replace/>;
    }

    return <Outlet/>;
}