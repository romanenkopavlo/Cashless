import parameters from "../../../public/parameters.json";
import Token from "../../models/users/Token.ts";
import {AxiosJwt} from "../../utils/Axios-JWT.ts";

const URL_AUTH = parameters.URL_AUTH

export const TokenJWT = async(username: string, password: string): Promise<Token | null> => {
    try {
        const axiosJWT = AxiosJwt()
        const response = await axiosJWT.post<Token>(`${URL_AUTH}`, {username, password});
        console.log(`response.data de requette TokenLWT ${response.data.token}`)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}