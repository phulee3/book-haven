"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"

export const useCart = () => {
  const [cart, setCart] = useState([])
  const [showAddToCartModal, setShowAddToCartModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart:", error)
        localStorage.removeItem("cart")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart))
    } else {
      localStorage.removeItem("cart")
    }
  }, [cart])

  const addToCart = (product, currentUser, setShowLoginModal) => {
    if (!currentUser) {
      setShowLoginModal(true)
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng")
      return
    }

    setSelectedProduct(product)
    setSelectedQuantity(1)
    setShowAddToCartModal(true)
  }

  const confirmAddToCart = () => {
    if (!selectedProduct) return

    const existingItemIndex = cart.findIndex(item => item.id === selectedProduct.id)

    if (existingItemIndex >= 0) {
      // Update existing item
      setCart(prev =>
        prev.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + selectedQuantity }
            : item
        )
      )
      toast.success(`Đã cập nhật số lượng ${selectedProduct.title}`)
    } else {
      // Add new item
      const newItem = {
        ...selectedProduct,
        quantity: selectedQuantity,
        selected: true,
        addedAt: new Date().toISOString(),
      }
      setCart(prev => [...prev, newItem])
      toast.success(`Đã thêm ${selectedProduct.title} vào giỏ hàng`)
    }

    setShowAddToCartModal(false)
    setSelectedProduct(null)
    setSelectedQuantity(1)
  }

  const removeFromCart = (productId) => {
    const item = cart.find(item => item.id === productId)
    setCart(prev => prev.filter(item => item.id !== productId))

    if (item) {
      toast.success(`Đã xóa ${item.title} khỏi giỏ hàng`)
    }
  }

  const removeSelectedFromCart = () => {
    const selectedItems = cart.filter(item => item.selected)
    const selectedCount = selectedItems.length

    if (selectedCount === 0) {
      toast.error("Vui lòng chọn sản phẩm để xóa")
      return
    }

    setCart(prev => prev.filter(item => !item.selected))
    toast.success(`Đã xóa ${selectedCount} sản phẩm khỏi giỏ hàng`)
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }

    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const toggleItemSelection = (productId) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, selected: !item.selected }
          : item
      )
    )
  }

  const selectAllItems = (selected = true) => {
    setCart(prev =>
      prev.map(item => ({ ...item, selected }))
    )
  }

  const getTotalPrice = () => {
    return cart
      .filter(item => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getSelectedCount = () => {
    return cart.filter(item => item.selected).length
  }

  const getSelectedItemsCount = () => {
    return cart
      .filter(item => item.selected)
      .reduce((total, item) => total + item.quantity, 0)
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("cart")
    toast.success("Đã xóa toàn bộ giỏ hàng")
  }

  const hasSelectedItems = () => {
    return cart.some(item => item.selected)
  }

  // Quick add to cart without modal (for buy now functionality)
  const quickAddToCart = (product, quantity = 1, currentUser, setShowLoginModal) => {
    if (!currentUser) {
      setShowLoginModal(true)
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng")
      return false
    }

    const existingItemIndex = cart.findIndex(item => item.id === product.id)

    if (existingItemIndex >= 0) {
      setCart(prev =>
        prev.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      )
    } else {
      const newItem = {
        ...product,
        quantity,
        selected: true,
        addedAt: new Date().toISOString(),
      }
      setCart(prev => [...prev, newItem])
    }

    toast.success(`Đã thêm ${product.title} vào giỏ hàng`)
    return true
  }

  return {
    cart,
    setCart,
    showAddToCartModal,
    setShowAddToCartModal,
    selectedProduct,
    setSelectedProduct,
    selectedQuantity,
    setSelectedQuantity,
    addToCart,
    quickAddToCart,
    confirmAddToCart,
    removeFromCart,
    removeSelectedFromCart,
    updateQuantity,
    toggleItemSelection,
    selectAllItems,
    getTotalPrice,
    getCartCount,
    getSelectedCount,
    getSelectedItemsCount,
    clearCart,
    hasSelectedItems,
  }
}