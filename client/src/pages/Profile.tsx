import parameters from "../../public/parameters.json";
import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";
import {Box, Button, Container, Typography} from "@mui/material";
import {useAuthenticationJWTStore} from "../store/AuthenticationJWT.ts";
import {getDecodedToken} from "../utils/TokenDecodage.ts";
import {AxiosJwt} from "../utils/Axios-JWT.ts";

export const Profile = () => {
    const {accessToken} = useAuthenticationJWTStore()
    console.log(accessToken?.token)
    const user = getDecodedToken(accessToken?.token)
    console.log(user)
    const URL_BALANCE = parameters.URL_BALANCE

    const handleCheckBalance = async () => {
        try {
            const axiosJWT = AxiosJwt()
            const response = await axiosJWT.get(`${URL_BALANCE}`)
            console.log("Balance: " + response.data.balance)
        } catch (error) {
            console.error("Erreur lors de la récupération du solde:", error);
        }
    }

    return (
        <>
            <Header/>
            <Container maxWidth="xs" sx={{mt: 3}}>
                <Box
                    sx = {
                        {
                            p: 4,
                            boxShadow: 16,
                            borderRadius: 2,
                            bgcolor: "background.paper"
                        }
                    }>
                    <Typography
                        variant="subtitle1"
                        sx={{fontWeight: 'bold', textAlign: 'left'}}
                    >
                        ID: {user?.id}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{fontWeight: 'bold', textAlign: 'left'}}
                    >
                        Username: {user?.username}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{fontWeight: 'bold', textAlign: 'left'}}
                    >
                        Role: {user?.role}
                    </Typography>
                </Box>
            </Container>
            <Container maxWidth="xs" sx={{mt: 3}}>
                <Box
                    sx = {
                        {
                            p: 4,
                            boxShadow: 16,
                            borderRadius: 2,
                            bgcolor: "background.paper"
                        }
                    }>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{mt: 3}}
                        onClick={handleCheckBalance}
                    >
                        Check balance
                    </Button>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}