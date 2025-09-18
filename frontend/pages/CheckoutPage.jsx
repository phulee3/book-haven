import Header from "../components/Header"
import Checkout from "../components/Checkout"
import Footer from "../components/Footer"

const CheckoutPage = ({ setCurrentPage, cart, getTotalPrice, createOrder, currentUser, updateUser }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setCurrentPage={setCurrentPage} cartCount={getCartCount()} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán</h1>
          <p className="text-gray-600">Hoàn tất thông tin để đặt hàng</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Checkout
              cart={cart}
              getTotalPrice={getTotalPrice}
              createOrder={createOrder}
              setCurrentPage={setCurrentPage}
              currentUser={currentUser}
              updateUser={updateUser}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Đơn hàng của bạn</h2>

              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</div>
                      <div className="text-sm text-gray-600">Số lượng: {item.quantity}</div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 ml-4">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-red-600">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CheckoutPage
