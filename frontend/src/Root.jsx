import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/layouts/Header/Header'
import Footer from './components/layouts/Footer/Footer'
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from './components/context/ModalContext/ModalContext';
import GlobalModals from './components/context/ModalContext/GlobalModals';
import TitleName from './components/hooks/TitleName/TitleName';
import { getPageTitle } from './components/hooks/TitleName/pageTitles';


const Root = () => {
    // default tab title + icon for the current page
    const { pathname } = useLocation();
    const page = getPageTitle(pathname);

    return (
        <ModalProvider>
            <TitleName title={page.title} icon={page.icon} />
            <div>
                <Toaster position="top-center" />
                <Header />
                <Outlet />
                <Footer />
            </div>
            <GlobalModals />
        </ModalProvider>
    )
}

export default Root
