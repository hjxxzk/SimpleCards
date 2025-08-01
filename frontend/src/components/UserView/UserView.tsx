import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './UserView.styles';

const UserView = () => {

    const LOGIN_PAGE = "/login"
    const navigate = useNavigate();
    const styles = useStyles();

    function logOut() {
        localStorage.setItem("accessToken", "");
        navigate(LOGIN_PAGE);
    }

    return (
        <div className={styles.logOutButton} onClick={logOut}>
            <h1>Wyloguj się</h1>
            <LogOut color="black" size={25} onClick={() => console.log("dupa")} />
        </div>
    );
}

export default UserView;