import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Bars/Navbar/Navbar';
import Sidebar from './components/Bars/Sidebar/Sidebar';

const Layout = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const MEDIUM_OR_LARGER_SCREEN = "(width > 1024px)";
    const match = window.matchMedia(MEDIUM_OR_LARGER_SCREEN)
    match.addEventListener('change', (event) => {
        if (event.matches) {
            setIsSidebarVisible(true);
        };
    });

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
