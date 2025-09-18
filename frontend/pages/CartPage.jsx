"use client"
import Header from "../components/Header"
import Cart from "../components/Cart"
import Footer from "../components/Footer"

const CartPage = ({
  setCurrentPage,
  cart,
  removeFromCart,
  removeSelectedFromCart,
  updateQuantity,
  toggleItemSelection,
  getTotalPrice,
  getSelectedCount,
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const hasSelectedItems = () => {
    return cart.some((item) => item.selected)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setCurrentPage={setCurrentPage} cartCount={getCartCount()} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Giỏ hàng của bạn</h1>
            <p className="text-gray-600">
              {cart.length > 0 ? `${getCartCount()} sản phẩm trong giỏ hàng` : "Không có sản phẩm nào"}
            </p>
          </div>
          {hasSelectedItems() && (
            <button
              onClick={removeSelectedFromCart}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Xóa ({getSelectedCount()})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              toggleItemSelection={toggleItemSelection}
              getTotalPrice={getTotalPrice}
            />
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Tổng cộng:</span>
                      <span className="text-lg font-bold text-red-600">{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setCurrentPage("checkout")}
                    disabled={!hasSelectedItems()}
                    className={`w-full py-3 px-4 rounded-lg transition-colors font-medium ${
                      hasSelectedItems()
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Tiến hành thanh toán
                  </button>
                  <button
                    onClick={() => setCurrentPage("home")}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {cart.length === 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setCurrentPage("home")}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Bắt đầu mua sắm
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default CartPage
