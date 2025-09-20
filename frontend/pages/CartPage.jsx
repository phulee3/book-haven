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

  const getSelectedItemsTotal = () => {
    return cart
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getSelectedItemsCount = () => {
    return cart
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setCurrentPage={setCurrentPage} cartCount={getCartCount()} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Giỏ hàng của bạn
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {cart.length > 0
                  ? `${getCartCount()} sản phẩm trong giỏ hàng`
                  : "Không có sản phẩm nào"
                }
              </p>
            </div>

            {/* Mobile/Desktop Remove Button */}
            {hasSelectedItems() && (
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <span className="text-sm text-gray-600 sm:hidden">
                  Đã chọn {getSelectedCount()} sản phẩm
                </span>
                <button
                  onClick={removeSelectedFromCart}
                  className="bg-red-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="hidden sm:inline">Xóa ({getSelectedCount()})</span>
                  <span className="sm:hidden">Xóa đã chọn</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Sản phẩm trong giỏ hàng
                  </h2>
                </div>
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  toggleItemSelection={toggleItemSelection}
                  getTotalPrice={getTotalPrice}
                />
              </div>
            </div>

            {/* Order Summary - Sticky on Desktop */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 xl:sticky xl:top-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                  Tóm tắt đơn hàng
                </h2>

                {/* Order Details */}
                <div className="space-y-3 sm:space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600">Số lượng:</span>
                    <span className="font-medium">
                      {hasSelectedItems() ? getSelectedItemsCount() : getCartCount()} sản phẩm
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">
                      {formatPrice(hasSelectedItems() ? getSelectedItemsTotal() : getTotalPrice())}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium text-green-600">Miễn phí</span>
                  </div>

                  {/* Discount Section */}
                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Mã giảm giá"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors whitespace-nowrap">
                        Áp dụng
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-200 pt-3 sm:pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base sm:text-lg font-semibold text-gray-900">Tổng cộng:</span>
                      <span className="text-lg sm:text-xl font-bold text-red-600">
                        {formatPrice(hasSelectedItems() ? getSelectedItemsTotal() : getTotalPrice())}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setCurrentPage("checkout")}
                    disabled={!hasSelectedItems()}
                    className={`w-full py-3 px-4 rounded-lg transition-colors font-medium text-sm sm:text-base ${hasSelectedItems()
                      ? "bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    {hasSelectedItems()
                      ? `Thanh toán (${hasSelectedItems() ? getSelectedItemsCount() : getCartCount()}  sản phẩm)`
                      : "Chọn sản phẩm để thanh toán"
                    }
                  </button>

                  <button
                    onClick={() => setCurrentPage("categories")}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm sm:text-base"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>

                {/* Security Info */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Thanh toán an toàn và bảo mật</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="max-w-md mx-auto">
              <div className="text-gray-400 text-6xl sm:text-8xl mb-6">🛒</div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Giỏ hàng trống
              </h2>
              <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Hãy thêm một số sản phẩm tuyệt vời vào giỏ hàng của bạn
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setCurrentPage("home")}
                  className="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
                >
                  Khám phá sản phẩm
                </button>
                <button
                  onClick={() => setCurrentPage("categories")}
                  className="w-full sm:w-auto bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm sm:text-base sm:ml-3"
                >
                  Xem danh mục
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        {cart.length > 0 && (
          <div className="mt-8 lg:mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Miễn phí vận chuyển</h3>
                  <p className="text-xs text-gray-600">Cho đơn hàng từ 200k</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Đảm bảo chất lượng</h3>
                  <p className="text-xs text-gray-600">100% hàng chính hãng</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Thanh toán đa dạng</h3>
                  <p className="text-xs text-gray-600">Nhiều phương thức</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Hỗ trợ 24/7</h3>
                  <p className="text-xs text-gray-600">Tư vấn nhiệt tình</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default CartPage