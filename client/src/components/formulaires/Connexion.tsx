import './Connexion.css'
import {FaLock, FaUser} from "react-icons/fa"
import {Box, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {ServerCheckOnline} from "../../services_REST/serveur/ServerCheckOnline.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {useAuthenticationJWTStore} from "../../store/AuthenticationJWT.ts";
import {ValidationConnexion} from "./ValidationConnexion.ts";
import {TokenJWT} from "../../services_REST/serveur/TokenJWT.ts";

interface FormData {
    login: string
    password: string
}

export const Connexion = () => {
    const [message, setMessage] = useState<string>('Connexion...')
    const {register, handleSubmit, formState:{errors}} = useForm<FormData>();
    const navigate = useNavigate()
    const {setToken} = useAuthenticationJWTStore()

    const onSubmit:SubmitHandler<FormData>=data => {
        TokenJWT(data.login, data.password)
            .then(token => {
                if (token != null) {
                    console.log(token)
                    setToken(token)
                    navigate('/profile')
                }
            })
        console.log(data)
    }

    useEffect(() => {
        const repeat = setInterval(() => {
            ServerCheckOnline()
                .then((state: boolean) => {
                    if(state) {
                        setMessage(`⚙️ Serveur distant fonctionnel`)
                    } else {
                        setMessage(`⛓️‍💥 Le serveur distant ne répond pas.Veuillez vous reconnecter plus tard!`)
                    }
                })
        }, 3500)

        return() => clearInterval(repeat)

    }, [])

    const setMessageColor = (message: string) => {
        if (message.includes(`⚙️`)) {
            return 'success'
        } else if (message.includes(`⛓️‍💥`)) {
            return 'error'
        }
        return 'text.secondary'
    }

    return (
        <>
            <div className="wrapper-main">
                <div className="wrapper">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input {...register("password", ValidationConnexion.password)} type="text" placeholder="Pseudo" required/>
                            <FaUser className="icon"/>
                        </div>
                        <div className="input-box">
                            <input {...register("login", ValidationConnexion.login)} type="text" placeholder="Mot de passe" required/>
                            <FaLock className="icon"/>
                        </div>

                        <button type="submit">Login</button>

                        <div className="register-link">
                            <p>Vous n'avez pas encore de compte? <a href="#">S'inscrire</a></p>
                        </div>
                        <Container maxWidth="sm" sx={{mt: 5}}>
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
                                    sx={{fontWeight: 'bold'}}
                                    color={setMessageColor(message)}
                                >
                                    {message}
                                </Typography>
                            </Box>

                        </Container>
                    </form>
                </div>
            </div>
        </>
    )
}