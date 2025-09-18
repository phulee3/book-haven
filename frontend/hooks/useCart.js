import { useState } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const addToCart = (product, currentUser, setShowLoginModal) => {
    if (!currentUser) {
      setShowAddToCartModal(false);
      setShowLoginModal(true);
      return;
    }
    setSelectedProduct(product);
    setSelectedQuantity(1);
    setShowAddToCartModal(true);
  };

  const confirmAddToCart = () => {
    const existingItem = cart.find((item) => item.id === selectedProduct.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === selectedProduct.id ? { ...item, quantity: item.quantity + selectedQuantity } : item
        )
      );
    } else {
      setCart([...cart, { ...selectedProduct, quantity: selectedQuantity, selected: true }]);
    }
    setShowAddToCartModal(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const removeFromCart = (productId) => setCart(cart.filter((item) => item.id !== productId));
  const removeSelectedFromCart = () => setCart(cart.filter((item) => !item.selected));
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) removeFromCart(productId);
    else setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)));
  };
  const toggleItemSelection = (productId) => {
    setCart(cart.map((item) => (item.id === productId ? { ...item, selected: !item.selected } : item)));
  };

  const getTotalPrice = () => cart.filter((item) => item.selected).reduce((total, item) => total + item.price * item.quantity, 0);
  const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getSelectedCount = () => cart.filter((item) => item.selected).length;

  return {
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
  };
}