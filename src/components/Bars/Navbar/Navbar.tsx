import { useState } from 'react';
import useStyles from './Navbar.styles';
import { CircleUserRound, Menu } from 'lucide-react';
import Sidebar from '../Sidebar/Sidebar';

const Navbar = () => {

    const styles = useStyles();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const MEDIUM_OR_LARGER_SCREEN = "(width > 1024px)";


    const match = window.matchMedia(MEDIUM_OR_LARGER_SCREEN)
    match.addEventListener('change', (event) => {
        if (event.matches) {
            setIsSidebarVisible(true);
        };
    });

    return (
        <>
            <div className={styles.navbar}>
                <Menu className={styles.menu} color="black" size={22} onClick={() => setIsSidebarVisible(!isSidebarVisible)} />
                <img src="src\assets\logo.png" alt="Logo" className={styles.logo} />
                <CircleUserRound className={styles.icon} color="black" size={22} />
            </div>
            {isSidebarVisible && <Sidebar />}
        </>
    )
}

export default Navbar;