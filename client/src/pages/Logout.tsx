import {useNavigate} from "react-router";
import {useAuthenticationJWTStore} from "../store/AuthenticationJWT.ts";

export const Logout = () => {
    const navigate = useNavigate();
    const {setToken} = useAuthenticationJWTStore()
    localStorage.removeItem("token-store");
    setToken(null);
    navigate("/login", {replace: true})
    return null
}