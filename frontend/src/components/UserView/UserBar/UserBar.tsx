import { ArrowLeft, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./UserBar.styles";


export const UserBar = () => {
    const LOGIN_PAGE = "/login"
    const HOME_PAGE = "/"
    const navigate = useNavigate();
    const styles = useStyles();
    const DB_ADDRESS = import.meta.env.VITE_DB_ADDRESS;
    const LOGOUT = import.meta.env.VITE_LOGOUT;

    function handlelogOut() {
        logOut();
        localStorage.setItem("accessToken", "");
        localStorage.setItem("refreshToken", "");
        navigate(LOGIN_PAGE);
    }

    async function logOut() {
        const refreshToken = localStorage.getItem("refreshToken");
        await fetch(`${DB_ADDRESS}${LOGOUT}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        });

    }

    return (
        <div className={styles.container} >
            <ArrowLeft className={styles.icons} size={25} onClick={() => navigate(HOME_PAGE)} />
            <LogOut className={styles.icons} size={25} onClick={handlelogOut} />
        </div>
    );
}