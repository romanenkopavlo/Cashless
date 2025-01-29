import {jwtDecode, JwtPayload} from "jwt-decode";
import {decryptData} from "../outils/CryptoLocalStorage.ts";
import {useAuthenticationJWTStore} from "../store/AuthenticationJWT.ts";
import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";

interface CustomJWTPayload extends JwtPayload {
    id: number;
    username: string;
    role: string;
}

const getUserPayload = (token:string | null):CustomJWTPayload | null => {
    try {
        const decryptedToken = decryptData(token);
        const parsedDecryptedToken = JSON.parse(decryptedToken);
        const jwtToken = parsedDecryptedToken.accessToken;
        const decoded = jwtDecode<CustomJWTPayload>(jwtToken);
        console.log(decoded.id, decoded.username, decoded.role);
        return decoded;
    } catch (error) {
        console.error("Failed to decode token: ", error);
        return null;
    }
}

export const Profile = () => {
    const {token} = useAuthenticationJWTStore();
    return (
        <>
            <Header/>
            <br/>
            <div>My profile</div>
            <div>Id: {getUserPayload(token)?.id}</div>
            <div>Username: {getUserPayload(token)?.username}</div>
            <div>Role: {getUserPayload(token)?.role}</div>
            <Footer/>
        </>
    )
}