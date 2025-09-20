"use client"

import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"

// Pages
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import AdminPage from "./pages/AdminPage"
import CategoriesPage from "./pages/CategoriesPage"
import AccountPage from "./pages/AccountPage"

// Components
import { LoginModal } from "./components/modals/LoginModal"
import { AddToCartModal } from "./components/modals/AddToCartModal"
import { PageRouter } from "./components/common/PageRouter"

// Hooks
import { useAuth } from "./hooks/useAuth"
import { useCart } from "./hooks/useCart"
import { useCategories } from "./hooks/useCategories"
import { useOrders } from "./hooks/useOrders"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Custom hooks
  const auth = useAuth()
  const cart = useCart()
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories()
  const { orders, addOrder, updateOrderStatus, createOrder } = useOrders()

  // Scroll to top when navigating to Categories page
  useEffect(() => {
    if (currentPage === "categories") {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      } catch (_) {
        window.scrollTo(0, 0)
      }
    }
  }, [currentPage])

  // Navigation handlers
  const handleSearch = (query) => {
    setSearchQuery(query)
    setCurrentPage("categories")
  }

  const navigateToCategory = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentPage("categories")
  }

  // Enhanced order creation with cart integration
  const handleCreateOrder = (orderData) => {
    const selectedItems = cart.cart.filter((item) => item.selected)
    const newOrder = createOrder({
      ...orderData,
      items: selectedItems,
      total: cart.getTotalPrice(),
    })

    // Remove selected items from cart
    cart.setCart(cart.cart.filter((item) => !item.selected))
    return newOrder
  }

  // Page props factory
  const getCommonProps = () => ({
    setCurrentPage,
    currentUser: auth.currentUser,
    setShowLoginModal: auth.setShowLoginModal,
    handleLogout: auth.handleLogout,
    handleSearch,
    cartCount: cart.getCartCount(),
  })

  const pageProps = {
    home: {
      ...getCommonProps(),
      addToCart: (product) => cart.addToCart(product, auth.currentUser, auth.setShowLoginModal),
      navigateToCategory,
      categories,
    },

    cart: {
      ...getCommonProps(),
      cart: cart.cart,
      removeFromCart: cart.removeFromCart,
      removeSelectedFromCart: cart.removeSelectedFromCart,
      updateQuantity: cart.updateQuantity,
      toggleItemSelection: cart.toggleItemSelection,
      getTotalPrice: cart.getTotalPrice,
      getSelectedCount: cart.getSelectedCount,
    },

    checkout: {
      ...getCommonProps(),
      cart: cart.cart.filter((item) => item.selected),
      getTotalPrice: cart.getTotalPrice,
      createOrder: handleCreateOrder,
    },

    categories: {
      ...getCommonProps(),
      addToCart: (product) => cart.addToCart(product, auth.currentUser, auth.setShowLoginModal),
      categories,
      searchQuery,
      selectedCategory,
      setSelectedCategory,
    },

    account: {
      ...getCommonProps(),
      updateUser: auth.updateUser,
      deleteUser: (id) => {
        auth.setUsers(auth.users.filter((u) => u.id !== id))
        if (auth.currentUser?.id === id) auth.setCurrentUser(null)
        setCurrentPage("home")
      },
      handleLogout: () => {
        auth.handleLogout()
        setCurrentPage("home")
      },
    },

    admin: {
      ...getCommonProps(),
      orders,
      updateOrderStatus,
      addOrder,
      users: auth.users,
      addUser: auth.addUser,
      updateUser: auth.updateUser,
      deleteUser: auth.deleteUser,
      categories,
      addCategory,
      updateCategory,
      deleteCategory,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageRouter
        currentPage={currentPage}
        pageProps={pageProps}
        currentUser={auth.currentUser}
      />

      {/* Modals */}
      <LoginModal
        showLoginModal={auth.showLoginModal}
        setShowLoginModal={auth.setShowLoginModal}
        showRegister={auth.showRegister}
        setShowRegister={auth.setShowRegister}
        handleLogin={(email, password) => auth.handleLogin(email, password, setCurrentPage)}
        handleRegister={auth.handleRegister}
      />

      <AddToCartModal
        showModal={cart.showAddToCartModal}
        setShowModal={cart.setShowAddToCartModal}
        selectedProduct={cart.selectedProduct}
        selectedQuantity={cart.selectedQuantity}
        setSelectedQuantity={cart.setSelectedQuantity}
        confirmAddToCart={cart.confirmAddToCart}
      />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#10B981',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '8px',
            padding: '12px 16px',
          },
          success: {
            iconTheme: {
              primary: '#fff',
              secondary: '#10B981',
            },
          },
          error: {
            style: {
              background: '#EF4444',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#EF4444',
            },
          },
        }}
      />
    </div>
  )
}

export default App