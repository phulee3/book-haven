"use client"

import { useState, useEffect } from "react"

const Checkout = ({ cart, getTotalPrice, createOrder, setCurrentPage, currentUser, updateUser }) => {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    notes: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isProcessing, setIsProcessing] = useState(false)
  const [saveAsDefault, setSaveAsDefault] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setCustomerInfo((prev) => ({
        ...prev,
        fullName: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        city: currentUser.province || "",
        district: currentUser.district || "",
        ward: currentUser.ward || "",
      }))
    }
  }, [currentUser])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      if (currentUser && saveAsDefault && typeof updateUser === 'function') {
        updateUser(currentUser.id, {
          name: customerInfo.fullName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address,
          province: customerInfo.city,
          district: customerInfo.district,
          ward: customerInfo.ward,
        })
      }
      const order = createOrder({
        customerInfo,
        paymentMethod,
      })

      setIsProcessing(false)
      alert(`Đặt hàng thành công! Mã đơn hàng: ${order.id}`)
      setCurrentPage("home")
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin giao hàng</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên *</label>
            <input
              type="text"
              name="fullName"
              value={customerInfo.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
            <input
              type="tel"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tỉnh/Thành phố</label>
            <select
              name="city"
              value={customerInfo.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn tỉnh/thành phố</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
              <option value="danang">Đà Nẵng</option>
              <option value="haiphong">Hải Phòng</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quận/Huyện</label>
            <input
              type="text"
              name="district"
              value={customerInfo.district}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phường/Xã</label>
            <input
              type="text"
              name="ward"
              value={customerInfo.ward}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ cụ thể *</label>
          <textarea
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Số nhà, tên đường..."
            required
          />
        </div>

        <label className="mt-4 inline-flex items-center">
          <input type="checkbox" className="mr-2" checked={saveAsDefault} onChange={(e) => setSaveAsDefault(e.target.checked)} />
          <span className="text-sm text-gray-700">Cập nhật địa chỉ này làm địa chỉ mặc định</span>
        </label>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú đơn hàng</label>
          <textarea
            name="notes"
            value={customerInfo.notes}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ghi chú thêm về đơn hàng..."
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>

        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div>
              <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
              <div className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</div>
            </div>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div>
              <div className="font-medium">Chuyển khoản ngân hàng</div>
              <div className="text-sm text-gray-600">Chuyển khoản trước khi giao hàng</div>
            </div>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div>
              <div className="font-medium">Ví MoMo</div>
              <div className="text-sm text-gray-600">Thanh toán qua ví điện tử MoMo</div>
            </div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => setCurrentPage("cart")}
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Quay lại giỏ hàng
        </button>
        <button
          type="submit"
          disabled={isProcessing}
          className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Đang xử lý..." : `Đặt hàng - ${formatPrice(getTotalPrice())}`}
        </button>
      </div>
    </form>
  )
}

export default Checkout
