import {Header} from "../components/Header.tsx";
import {Footer} from "../components/Footer.tsx";
import {Link} from "react-router";
import {Box, Button, Container, Typography} from "@mui/material";
import {useAuthenticationJWTStore} from "../store/AuthenticationJWT.ts";
import {getDecodedToken} from "../utils/TokenDecodage.ts";
import {UnloadLogout} from "../utils/UnloadLogout.ts";
import {AddCardForm} from "../components/formulaires/AddCard.tsx"

export const Profile = () => {
    const {accessToken} = useAuthenticationJWTStore()
    const user = getDecodedToken(accessToken?.token)

    UnloadLogout()

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
                    <Typography
                        variant="subtitle1"
                        sx={{fontWeight: 'bold', textAlign: 'left'}}
                    >
                        Solde: {user?.balance}€
                    </Typography>

                    <Box sx={{mt: 2, textAlign: "center"}}>
                        <Link to="/transaction-history" style={{textDecoration: "none"}}>
                            <Button color="inherit" className="cta-button">
                                Voir l'historique des transactions
                            </Button>
                        </Link>
                    </Box>
                </Box>
                <AddCardForm/>
            </Container>
            <Footer/>
        </>
    )
}