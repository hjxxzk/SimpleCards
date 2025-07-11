import useStyles from './Navbar.styles';
import { useNavigate } from "react-router-dom";
import { CircleUserRound, Menu } from 'lucide-react';

interface NavbarProps {
    toggleSidebar: () => void;
}

const Navbar = (props: NavbarProps) => {

    const styles = useStyles();
    const navigate = useNavigate();
    const HOME_PAGE = "/";
    const USER_PAGE = "/user";
    const logoPath = window.location.protocol + "//" + window.location.host + "/images/logo.png";

    return (
        <>
            <div className={styles.navbar}>
                <Menu className={styles.menu} color="black" size={22} onClick={() => { props.toggleSidebar() }} />
                <img src={logoPath} alt="Logo" className={styles.logo} onClick={() => { navigate(HOME_PAGE) }} />
                <CircleUserRound className={styles.icon} color="black" size={22} onClick={() => navigate(USER_PAGE)} />
            </div>
        </>
    )
}

export default Navbar;