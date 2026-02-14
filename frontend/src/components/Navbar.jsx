import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Desktop Navbar - Hidden on mobile/tablet */}
            <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 px-4 py-3">
                <div className="max-w-6xl mx-auto bg-white border-[3px] border-black rounded-2xl px-6 py-3 flex justify-between items-center shadow-[6px_6px_0px_#000]">
                    <Link to="/" className="text-3xl font-black text-black tracking-tight transform hover:scale-105 transition-transform">
                        JimatKaki 🦶
                    </Link>
                    <div className="flex space-x-3">
                        <DesktopNavLink to="/" active={isActive('/')}>Home</DesktopNavLink>
                        <DesktopNavLink to="/feed" active={isActive('/feed')}>Live Feed</DesktopNavLink>
                        <DesktopNavLink to="/submit" active={isActive('/submit')}>Report Price</DesktopNavLink>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation - Visible only on mobile/tablet */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-[3px] border-black shadow-[0px_-4px_0px_#000]">
                <div className="flex justify-around items-center py-2">
                    <MobileNavLink to="/" active={isActive('/')} icon="🏠" label="Home" />
                    <MobileNavLink to="/feed" active={isActive('/feed')} icon="📉" label="Feed" />
                    <MobileNavLink to="/submit" active={isActive('/submit')} icon="➕" label="Report" />
                </div>
            </nav>
        </>
    );
};

const DesktopNavLink = ({ to, children, active }) => (
    <Link
        to={to}
        className={`px-4 py-2 rounded-xl text-sm font-bold border-[2px] border-black transition-all duration-200
        ${active
                ? 'bg-[#FBBF24] text-black shadow-[3px_3px_0px_#000] -translate-y-1'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-[3px_3px_0px_#000] hover:-translate-y-1 shadow-none'}`}
    >
        {children}
    </Link>
);

const MobileNavLink = ({ to, active, icon, label }) => (
    <Link
        to={to}
        className={`flex flex-col items-center justify-center px-6 py-2 rounded-xl transition-all duration-200 min-w-[80px]
        ${active
                ? 'bg-[#FBBF24] border-2 border-black shadow-[3px_3px_0px_#000] -translate-y-1'
                : 'bg-transparent text-gray-600'}`}
    >
        <span className="text-2xl mb-1">{icon}</span>
        <span className={`text-xs font-bold ${active ? 'text-black' : 'text-gray-600'}`}>{label}</span>
    </Link>
);

export default Navbar;
