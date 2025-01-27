import ModToken from "../../models/users/ModToken.ts";
import axios from "axios";
import Cookies from "js-cookie";
import parametres from "../../../public/parametres.json";

const URL_SERVEUR = parametres.URL_SERVER
const URL_REFRESH_TOKEN = parametres.URL_REFRESH_TOKEN

export const GetNewAcessToken = async(): Promise<ModToken | null> => {
    try {
        const response = await axios.post<ModToken | null>(`${URL_SERVEUR}${URL_REFRESH_TOKEN}`, Cookies.get("refreshToken"))
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}