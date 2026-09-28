import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/layouts/Header/Header'
import Footer from './components/layouts/Footer/Footer'
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from './components/context/ModalContext/ModalContext';
import GlobalModals from './components/context/ModalContext/GlobalModals';


const Root = () => {
    return (
        <ModalProvider>
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