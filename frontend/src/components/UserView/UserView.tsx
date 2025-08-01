import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './UserView.styles';

const UserView = () => {

    const LOGIN_PAGE = "/login"
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
        <div className={styles.logOutButton} onClick={handlelogOut}>
            <h1>Wyloguj się</h1>
            <LogOut color="black" size={25} />
        </div>
    );
}

export default UserView;