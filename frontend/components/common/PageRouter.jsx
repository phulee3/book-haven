"use client"

import HomePage from "../../pages/HomePage"
import CartPage from "../../pages/CartPage"
import CheckoutPage from "../../pages/CheckoutPage"
import AdminPage from "../../pages/AdminPage"
import CategoriesPage from "../../pages/CategoriesPage"
import AccountPage from "../../pages/AccountPage"

export const PageRouter = ({ currentPage, pageProps, currentUser }) => {
    const renderPage = () => {
        switch (currentPage) {
            case "home":
                return <HomePage {...pageProps.home} />

            case "cart":
                return <CartPage {...pageProps.cart} />

            case "checkout":
                return <CheckoutPage {...pageProps.checkout} />

            case "categories":
                return <CategoriesPage {...pageProps.categories} />

            case "account":
                if (!currentUser) {
                    return <HomePage {...pageProps.home} />
                }
                return <AccountPage {...pageProps.account} currentUser={currentUser} />

            case "admin":
                if (!currentUser || currentUser.role !== "admin") {
                    return <HomePage {...pageProps.home} />
                }
                return <AdminPage {...pageProps.admin} />

            default:
                return <HomePage {...pageProps.home} />
        }
    }

    return renderPage()
}