import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/layouts/Header/Header'
import Footer from './components/layouts/Footer/Footer'
import { Toaster } from 'react-hot-toast';


const Root = () => {
    return (
        <div>
            <Toaster position="top-center" />
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Root