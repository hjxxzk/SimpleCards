import { Outlet, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Bars/Navbar/Navbar';
import Sidebar from './components/Bars/Sidebar/Sidebar';
import { refreshToken } from './services/AuthService';

const Layout = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const MEDIUM_OR_LARGER_SCREEN = "(width < 1024px)";
    const match = window.matchMedia(MEDIUM_OR_LARGER_SCREEN);
    const params = useParams();
    refreshToken();

    match.addEventListener('change', (event) => {
        if (event.matches) {
            setIsSidebarVisible(false);
        } else {
            setIsSidebarVisible(true);
        }
    });

    useEffect(() => {
        if (params.id && match.matches) {
            setIsSidebarVisible(false);
        } else {
            setIsSidebarVisible(true);
        }
    }, [params]);

    function toggleSidebar() {
        setIsSidebarVisible(!isSidebarVisible);
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex flex-col bg-neutral-100">
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="w-full h-full flex overflow-hidden">
                {isSidebarVisible && <Sidebar />}
                <Outlet />
            </div>
        </div>
    )
};

export default Layout;
