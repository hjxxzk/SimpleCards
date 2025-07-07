import { useState } from 'react';
import useStyles from './Navbar.styles';
import { CircleUserRound, Menu } from 'lucide-react';

const Navbar = () => {

    const styles = useStyles();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    return (
        <>
            <div className={styles.navbar}>
                <Menu className={styles.icon} color="black" size={22} onClick={() => setIsSidebarVisible(!isSidebarVisible)} />
                <p>SimpleCards</p>
                <CircleUserRound className={styles.icon} color="black" size={22} />
            </div>
            {isSidebarVisible && <div className={styles.sidebar}>
                Your Decks:
            </div>}
        </>
    )
}

export default Navbar;