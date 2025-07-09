import useStyles from './Navbar.styles';
import { CircleUserRound, Menu } from 'lucide-react';

interface NavbarProps {
    toggleSidebar: () => void;
}

const Navbar = (props: NavbarProps) => {

    const styles = useStyles();

    return (
        <>
            <div className={styles.navbar}>
                <Menu className={styles.menu} color="black" size={22} onClick={() => { props.toggleSidebar() }} />
                <img src="src\assets\logo.png" alt="Logo" className={styles.logo} />
                <CircleUserRound className={styles.icon} color="black" size={26} />
            </div>
        </>
    )
}

export default Navbar;