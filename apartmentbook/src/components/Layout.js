import React from 'react';
import Navbar from './Navbar';

const Layout = ({
    children, isAuthenticated
}) => {
    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} />
            {children}
        </>
    )
}
export default Layout;