import ModToken from "../../models/users/ModToken.ts";
import axios, {AxiosError} from "axios";
import parametres from "../../../public/parametres.json";

const URL_SERVEUR = parametres.URL_SERVER
const URL_AUTH = parametres.URL_AUTH

export const TokenJWT = async(username: string, password: string): Promise<ModToken | null> => {
    try {
        const response = await axios.post<ModToken | null>(`${URL_SERVEUR}${URL_AUTH}`, {username, password}, { withCredentials: true });
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response && error.response.status === 401) {
                throw new Error(error.response.data.message);
            }
        }
        return null
    }
}