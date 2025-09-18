"use client"

import { useState, useEffect } from "react"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import AdminPage from "./pages/AdminPage"
import CategoriesPage from "./pages/CategoriesPage"
import AccountPage from "./pages/AccountPage"
import { LoginModal } from "./components/modals/LoginModal"
import { useAuth } from "./hooks/useAuth"
import { useCart } from "./hooks/useCart"

function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [orders, setOrders] = useState([])
  const [categories, setCategories] = useState([
    { id: 1, name: "Sách thiếu nhi" },
    { id: 2, name: "Sách giáo dục" },
    { id: 3, name: "Sách kỹ năng sống" },
    { id: 4, name: "Truyện cổ tích" },
  ])

  // Use custom hooks
  const {
    currentUser,
    setCurrentUser,
    showLoginModal,
    setShowLoginModal,
    showRegister,
    setShowRegister,
    users,
    setUsers,
    handleLogin: authLogin,
    handleRegister: authRegister,
    handleLogout: authLogout,
  } = useAuth()

  const {
    cart,
    setCart,
    showAddToCartModal,
    setShowAddToCartModal,
    selectedProduct,
    selectedQuantity,
    setSelectedQuantity,
    showNotification,
    addToCart,
    confirmAddToCart,
    removeFromCart,
    removeSelectedFromCart,
    updateQuantity,
    toggleItemSelection,
    getTotalPrice,
    getCartCount,
    getSelectedCount,
  } = useCart()

  // Scroll to top on navigating to Categories page
  useEffect(() => {
    if (currentPage === "categories") {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      } catch (_) {
        window.scrollTo(0, 0)
      }
    }
  }, [currentPage])

  // Wrapper functions to handle page navigation
  const handleLogin = (email, password) => {
    return authLogin(email, password, setCurrentPage)
  }

  const handleRegister = (newUserData) => {
    return authRegister(newUserData)
  }

  const handleLogout = () => {
    authLogout(setCurrentPage)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    setCurrentPage("categories")
  }

  const navigateToCategory = (categoryId) => {
    setSelectedCategory(categoryId)
    setCurrentPage("categories")
  }

  // Order management functions
  const createOrder = (orderData) => {
    const selectedItems = cart.filter((item) => item.selected)
    const newOrder = {
      id: Date.now(),
      ...orderData,
      items: selectedItems,
      total: getTotalPrice(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    }
    setOrders([...orders, newOrder])
    setCart(cart.filter((item) => !item.selected))
    return newOrder
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  const addUser = (userData) => {
    const newUser = { id: Date.now(), ...userData, role: "user" }
    setUsers([...users, newUser])
  }

  const updateUser = (userId, userData) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, ...userData } : user)))
  }

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const addCategory = (categoryData) => {
    const newCategory = { id: Date.now(), ...categoryData }
    setCategories([...categories, newCategory])
  }

  const updateCategory = (categoryId, categoryData) => {
    setCategories(
      categories.map((category) => (category.id === categoryId ? { ...category, ...categoryData } : category)),
    )
  }

  const deleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId))
  }

  const addOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      status: "Pending",
      createdAt: new Date().toISOString(),
    }
    setOrders([...orders, newOrder])
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            addToCart={(product) => addToCart(product, currentUser, setShowLoginModal)}
            cartCount={getCartCount()}
            currentUser={currentUser}
            setShowLoginModal={setShowLoginModal}
            handleLogout={handleLogout}
            handleSearch={handleSearch}
            navigateToCategory={navigateToCategory}
            categories={categories}
          />
        )
      case "cart":
        return (
          <CartPage
            setCurrentPage={setCurrentPage}
            cart={cart}
            removeFromCart={removeFromCart}
            removeSelectedFromCart={removeSelectedFromCart}
            updateQuantity={updateQuantity}
            toggleItemSelection={toggleItemSelection}
            getTotalPrice={getTotalPrice}
            getSelectedCount={getSelectedCount}
            currentUser={currentUser}
            setShowLoginModal={setShowLoginModal}
            handleLogout={handleLogout}
            handleSearch={handleSearch}
          />
        )
      case "checkout":
        return (
          <CheckoutPage
            setCurrentPage={setCurrentPage}
            cart={cart.filter((item) => item.selected)}
            getTotalPrice={getTotalPrice}
            createOrder={createOrder}
            currentUser={currentUser}
            setShowLoginModal={setShowLoginModal}
            handleLogout={handleLogout}
            handleSearch={handleSearch}
          />
        )
      case "categories":
        return (
          <CategoriesPage
            setCurrentPage={setCurrentPage}
            addToCart={(product) => addToCart(product, currentUser, setShowLoginModal)}
            cartCount={getCartCount()}
            currentUser={currentUser}
            setShowLoginModal={setShowLoginModal}
            handleLogout={handleLogout}
            handleSearch={handleSearch}
            categories={categories}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )
      case "account":
        if (!currentUser) {
          return (
            <HomePage
              setCurrentPage={setCurrentPage}
              addToCart={(product) => addToCart(product, currentUser, setShowLoginModal)}
              cartCount={getCartCount()}
              currentUser={currentUser}
              setShowLoginModal={setShowLoginModal}
              handleLogout={handleLogout}
              handleSearch={handleSearch}
              navigateToCategory={navigateToCategory}
              categories={categories}
            />
          )
        }
        return (
          <AccountPage
            setCurrentPage={setCurrentPage}
            currentUser={currentUser}
            updateUser={updateUser}
            deleteUser={(id) => {
              setUsers(users.filter((u) => u.id !== id))
              if (currentUser?.id === id) setCurrentUser(null)
              setCurrentPage("home")
            }}
            handleLogout={() => {
              handleLogout()
              setCurrentPage("home")
            }}
          />
        )
      case "admin":
        if (!currentUser || currentUser.role !== "admin") {
          return (
            <HomePage
              setCurrentPage={setCurrentPage}
              addToCart={(product) => addToCart(product, currentUser, setShowLoginModal)}
              cartCount={getCartCount()}
              currentUser={currentUser}
              setShowLoginModal={setShowLoginModal}
              handleLogout={handleLogout}
              handleSearch={handleSearch}
              navigateToCategory={navigateToCategory}
              categories={categories}
            />
          )
        }
        return (
          <AdminPage
            setCurrentPage={setCurrentPage}
            orders={orders}
            updateOrderStatus={updateOrderStatus}
            addOrder={addOrder}
            users={users}
            addUser={addUser}
            updateUser={updateUser}
            deleteUser={deleteUser}
            categories={categories}
            addCategory={addCategory}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
            currentUser={currentUser}
            handleLogout={handleLogout}
          />
        )
      default:
        return (
          <HomePage
            setCurrentPage={setCurrentPage}
            addToCart={(product) => addToCart(product, currentUser, setShowLoginModal)}
            cartCount={getCartCount()}
            currentUser={currentUser}
            setShowLoginModal={setShowLoginModal}
            handleLogout={handleLogout}
            handleSearch={handleSearch}
            navigateToCategory={navigateToCategory}
            categories={categories}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}

      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />

      {showAddToCartModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Thêm vào giỏ hàng</h3>
            {selectedProduct && (
              <div className="mb-4">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.title}
                  className="w-20 h-20 object-cover rounded mb-2"
                />
                <h4 className="font-medium">{selectedProduct.title}</h4>
                <p className="text-red-600 font-semibold">{selectedProduct.price.toLocaleString()}đ</p>
              </div>
            )}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <button
                onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-lg font-medium w-8 text-center">{selectedQuantity}</span>
              <button
                onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddToCartModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={confirmAddToCart}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          Đã thêm vào giỏ hàng
        </div>
      )}
    </div>
  )
}

export default App