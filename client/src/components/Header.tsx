import {AppBar, Button, Container, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router";
import './Header.css';
// import {useAuthenticationJWTStore} from "../store/AuthenticationJWT.ts";

export const Header = () => {
    // const {token} = useAuthenticationJWTStore()
    return (
        <AppBar position="sticky" className="header">
            <Toolbar>
                <Container maxWidth="lg" className="header-container">
                    <Typography variant="h6" className="logo">
                        Château de Freycinet
                    </Typography>
                    <nav>
                        <ul className="nav-list">
                            <li><Link to="/" className="nav-link">Accueil</Link></li>
                            <li><Link to="/about" className="nav-link">À propos</Link></li>
                            <li><Link to="/contact" className="nav-link">Contact</Link></li>
                        </ul>
                    </nav>
                        <Link to ="/logout">
                            <Button color="inherit" className="cta-button">
                                Déconnexion
                            </Button>
                        </Link>
                        <div className="header-buttons">
                            <Link to="/login">
                                <Button color="inherit" className="cta-button">
                                    Se connecter
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button color="inherit" className="cta-button">
                                    S'inscrire
                                </Button>
                            </Link>
                        </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}