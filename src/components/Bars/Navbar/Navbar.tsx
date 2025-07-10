import useStyles from './Navbar.styles';
import { useNavigate } from "react-router-dom";
import { CircleUserRound, Menu } from 'lucide-react';

interface NavbarProps {
    toggleSidebar: () => void;
}

const Navbar = (props: NavbarProps) => {

    const styles = useStyles();
    const navigate = useNavigate();


    return (
        <>
            <div className={styles.navbar}>
                <Menu className={styles.menu} color="black" size={22} onClick={() => { props.toggleSidebar() }} />
                <img src="src\assets\logo.png" alt="Logo" className={styles.logo} onClick={() => { navigate("/") }} />
                <CircleUserRound className={styles.icon} color="black" size={22} onClick={() => navigate("/user")} />
            </div>
        </>
    )
}

export default Navbar;