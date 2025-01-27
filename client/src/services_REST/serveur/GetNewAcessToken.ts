import ModToken from "../../models/users/ModToken.ts";
import axios from "axios";
import Cookies from "js-cookie";
import parametres from "../../../public/parametres.json";

const URL_SERVEUR = parametres.URL_SERVER
const URL_REFRESH_TOKEN = parametres.URL_REFRESH_TOKEN
const refreshToken = Cookies.get("refreshToken");

export const GetNewAcessToken = async(refreshToken: string): Promise<ModToken | null> => {
    try {
        const response = await axios.post<ModToken | null>(`${URL_SERVEUR}${URL_REFRESH_TOKEN}`, {refreshToken})
        return response.data
    }
}