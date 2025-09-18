"use client"

import { useState, useMemo, useEffect } from "react"
import { products as seedProducts } from "../data/products"
import OrdersTab from "./admin/OrdersTab"
import UsersTab from "./admin/UsersTab"
import ProductsTab from "./admin/ProductsTab"
import CategoriesTab from "./admin/CategoriesTab"

const Admin = ({
  orders,
  updateOrderStatus,
  addOrder,
  users,
  addUser,
  updateUser,
  deleteUser,
  categories,
  addCategory,
  updateCategory,
  deleteCategory,
}) => {
  const [activeTab, setActiveTab] = useState("orders")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showUserForm, setShowUserForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)

  const [currentOrderPage, setCurrentOrderPage] = useState(1)
  const [currentUserPage, setCurrentUserPage] = useState(1)
  const [currentProductPage, setCurrentProductPage] = useState(1)
  const itemsPerPage = 5

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    address: "",
  })
  const [categoryForm, setCategoryForm] = useState({ name: "" })

  // Products state for Admin management (separate from storefront)
  const [productsState, setProductsState] = useState(() =>
    seedProducts.map((p) => ({
      ...p,
      // attach a categoryId mapped to first category by default if not present
      categoryId: p.categoryId ?? (Array.isArray(categories) && categories.length ? categories[0].id : 1),
    })),
  )
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    title: "",
    imageUrl: "",
    oldPrice: 0,
    discount: 0,
    price: 0,
    categoryId: Array.isArray(categories) && categories.length ? categories[0].id : 1,
  })

  // keep price in sync with oldPrice+discount
  useEffect(() => {
    const base = Number(productForm.oldPrice) || 0
    const disc = Math.min(100, Math.max(0, Number(productForm.discount) || 0))
    const newPrice = Math.round(base * (1 - disc / 100))
    setProductForm((prev) => ({ ...prev, price: newPrice }))
  }, [productForm.oldPrice, productForm.discount])

  const [orderForm, setOrderForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    categoryId: "",
    productId: "",
    quantity: 1,
    paymentMethod: "COD",
  })

  const paginate = (items, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }

  const getTotalPages = (totalItems) => Math.ceil(totalItems / itemsPerPage)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleUserSubmit = (e) => {
    e.preventDefault()
    if (editingUser) {
      updateUser(editingUser.id, userForm)
    } else {
      addUser(userForm)
    }
    setShowUserForm(false)
    setEditingUser(null)
    setUserForm({ name: "", email: "", phone: "", province: "", district: "", ward: "", address: "" })
  }

  const handleCategorySubmit = (e) => {
    e.preventDefault()
    if (editingCategory) {
      updateCategory(editingCategory.id, categoryForm)
    } else {
      addCategory(categoryForm)
    }
    setShowCategoryForm(false)
    setEditingCategory(null)
    setCategoryForm({ name: "" })
  }

  const handleOrderSubmit = (e) => {
    e.preventDefault()
    const selectedProduct = products.find((p) => p.id === Number.parseInt(orderForm.productId))
    if (!selectedProduct) return

    const newOrder = {
      customerInfo: {
        fullName: orderForm.customerName,
        email: orderForm.customerEmail,
        phone: orderForm.customerPhone,
        address: orderForm.customerAddress,
        paymentMethod: orderForm.paymentMethod,
      },
      items: [
        {
          ...selectedProduct,
          quantity: orderForm.quantity,
        },
      ],
      total: selectedProduct.price * orderForm.quantity,
    }

    addOrder(newOrder)
    setShowOrderForm(false)
    setOrderForm({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerAddress: "",
      categoryId: "",
      productId: "",
      quantity: 1,
      paymentMethod: "COD",
    })
  }

  const startEditUser = (user) => {
    setEditingUser(user)
    setUserForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      province: user.province || "",
      district: user.district || "",
      ward: user.ward || "",
      address: user.address || "",
    })
    setShowUserForm(true)
  }

  const startEditCategory = (category) => {
    setEditingCategory(category)
    setCategoryForm({ name: category.name })
    setShowCategoryForm(true)
  }

  const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
      <div className="text-sm text-gray-700">
        Trang {currentPage} / {totalPages}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Trước
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Sau
        </button>
      </div>
    </div>
  )

  const renderOrders = () => {
    const paginatedOrders = paginate(orders, currentOrderPage)
    const totalPages = getTotalPages(orders.length)

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">Tổng: {orders.length} đơn hàng</div>
            <button
              onClick={() => setShowOrderForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Thêm đơn hàng
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-gray-600">Các đơn hàng sẽ hiển thị ở đây khi khách hàng đặt hàng</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mã đơn hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Khách hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tổng tiền
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày đặt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customerInfo.fullName}</div>
                        <div className="text-sm text-gray-500">{order.customerInfo.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPrice(order.total)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Chi tiết
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <PaginationComponent
                currentPage={currentOrderPage}
                totalPages={totalPages}
                onPageChange={setCurrentOrderPage}
              />
            )}
          </div>
        )}

        {showOrderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Thêm đơn hàng</h3>
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tên khách hàng"
                  value={orderForm.customerName}
                  onChange={(e) => setOrderForm({ ...orderForm, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email khách hàng"
                  value={orderForm.customerEmail}
                  onChange={(e) => setOrderForm({ ...orderForm, customerEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="tel"
                  placeholder="Điện thoại"
                  value={orderForm.customerPhone}
                  onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={orderForm.customerAddress}
                  onChange={(e) => setOrderForm({ ...orderForm, customerAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <select
                  value={orderForm.categoryId}
                  onChange={(e) => {
                    setOrderForm({ ...orderForm, categoryId: e.target.value, productId: "" })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <select
                  value={orderForm.productId}
                  onChange={(e) => setOrderForm({ ...orderForm, productId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                  disabled={!orderForm.categoryId}
                >
                  <option value="">Chọn sản phẩm</option>
                  {products
                    .filter((product) => product.categoryId === Number.parseInt(orderForm.categoryId))
                    .map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.title} - {formatPrice(product.price)}
                      </option>
                    ))}
                </select>
                <input
                  type="number"
                  min="1"
                  placeholder="Số lượng"
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm({ ...orderForm, quantity: Number.parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <select
                  value={orderForm.paymentMethod}
                  onChange={(e) => setOrderForm({ ...orderForm, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                  <option value="Bank Transfer">Chuyển khoản ngân hàng</option>
                </select>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowOrderForm(false)
                      setOrderForm({
                        customerName: "",
                        customerEmail: "",
                        customerPhone: "",
                        customerAddress: "",
                        categoryId: "",
                        productId: "",
                        quantity: 1,
                        paymentMethod: "COD",
                      })
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Thêm đơn hàng
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {selectedOrder && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-4">
            <h3 className="text-lg font-semibold mb-4">Chi tiết đơn hàng #{selectedOrder.id}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Thông tin khách hàng:</h4>
                <p>
                  <strong>Tên:</strong> {selectedOrder.customerInfo.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.customerInfo.email}
                </p>
                <p>
                  <strong>Điện thoại:</strong> {selectedOrder.customerInfo.phone}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {selectedOrder.customerInfo.address}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Sản phẩm:</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.title} x{item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-semibold">
                    <div className="flex justify-between">
                      <span>Tổng cộng:</span>
                      <span>{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderUsers = () => {
    const paginatedUsers = paginate(users, currentUserPage)
    const totalPages = getTotalPages(users.length)

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h2>
          <button
            onClick={() => setShowUserForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Thêm người dùng
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Điện thoại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Địa chỉ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.province}, {user.district}, {user.ward}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button onClick={() => startEditUser(user)} className="text-blue-600 hover:text-blue-900">
                        Sửa
                      </button>
                      <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-900">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <PaginationComponent
              currentPage={currentUserPage}
              totalPages={totalPages}
              onPageChange={setCurrentUserPage}
            />
          )}
        </div>

        {showUserForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">{editingUser ? "Sửa người dùng" : "Thêm người dùng"}</h3>
              <form onSubmit={handleUserSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tên"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="tel"
                  placeholder="Điện thoại"
                  value={userForm.phone}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Tỉnh"
                  value={userForm.province}
                  onChange={(e) => setUserForm({ ...userForm, province: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Huyện"
                  value={userForm.district}
                  onChange={(e) => setUserForm({ ...userForm, district: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Xã"
                  value={userForm.ward}
                  onChange={(e) => setUserForm({ ...userForm, ward: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Địa chỉ cụ thể"
                  value={userForm.address}
                  onChange={(e) => setUserForm({ ...userForm, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserForm(false)
                      setEditingUser(null)
                      setUserForm({ name: "", email: "", phone: "", province: "", district: "", ward: "", address: "" })
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    {editingUser ? "Cập nhật" : "Thêm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderProducts = () => {
    const paginatedProducts = paginate(productsState, currentProductPage)
    const totalPages = getTotalPages(productsState.length)

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">Tổng: {productsState.length} sản phẩm</div>
            <button onClick={() => setShowProductForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Thêm sản phẩm
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá cũ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    % Giảm giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{product.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {categories.find((c) => c.id === product.categoryId)?.name || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.oldPrice ? formatPrice(product.oldPrice) : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={product.discount || 0}
                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                        onChange={(e) => {
                          const discount = Math.min(100, Math.max(0, Number.parseInt(e.target.value) || 0))
                          setProductsState((prev) =>
                            prev.map((p) =>
                              p.id === product.id
                                ? {
                                    ...p,
                                    discount,
                                    price: p.oldPrice ? Math.round(p.oldPrice * (1 - discount / 100)) : p.price,
                                  }
                                : p,
                            ),
                          )
                        }}
                      />
                      <span className="text-sm text-gray-500 ml-1">%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product)
                          setProductForm({
                            title: product.title,
                            imageUrl: product.imageUrl || "",
                            oldPrice: product.oldPrice || product.price,
                            discount: product.discount || 0,
                            price: product.price,
                            categoryId: product.categoryId,
                          })
                          setShowProductForm(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => setProductsState((prev) => prev.filter((p) => p.id !== product.id))}
                        className="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <PaginationComponent
              currentPage={currentProductPage}
              totalPages={totalPages}
              onPageChange={setCurrentProductPage}
            />
          )}
        </div>

        {showProductForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">{editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (editingProduct) {
                    setProductsState((prev) =>
                      prev.map((p) => (p.id === editingProduct.id ? { ...p, ...productForm } : p)),
                    )
                  } else {
                    const newId = Date.now()
                    setProductsState((prev) => [...prev, { id: newId, ...productForm }])
                  }
                  setShowProductForm(false)
                  setEditingProduct(null)
                  setProductForm({
                    title: "",
                    imageUrl: "",
                    oldPrice: 0,
                    discount: 0,
                    price: 0,
                    categoryId: Array.isArray(categories) && categories.length ? categories[0].id : 1,
                  })
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="url"
                  placeholder="Ảnh (URL)"
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <select
                  value={productForm.categoryId}
                  onChange={(e) => setProductForm({ ...productForm, categoryId: isNaN(+e.target.value) ? e.target.value : +e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="block text-sm text-gray-600 mb-1">Giá cũ</label>
                    <input
                      type="number"
                      min="0"
                      value={productForm.oldPrice}
                      onChange={(e) => setProductForm({ ...productForm, oldPrice: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm text-gray-600 mb-1">Giảm (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={productForm.discount}
                      onChange={(e) => setProductForm({ ...productForm, discount: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm text-gray-600 mb-1">Giá mới</label>
                    <input
                      type="number"
                      value={productForm.price}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProductForm(false)
                      setEditingProduct(null)
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    {editingProduct ? "Cập nhật" : "Thêm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderCategories = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý danh mục sản phẩm</h2>
        <button
          onClick={() => setShowCategoryForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Thêm danh mục
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => startEditCategory(category)} className="text-blue-600 hover:text-blue-900">
                      Sửa
                    </button>
                    <button onClick={() => deleteCategory(category.id)} className="text-red-600 hover:text-red-900">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">{editingCategory ? "Sửa danh mục" : "Thêm danh mục"}</h3>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tên danh mục"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryForm(false)
                    setEditingCategory(null)
                    setCategoryForm({ name: "" })
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  {editingCategory ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === "orders" ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              📋 Quản lý đơn hàng
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === "users" ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              👥 Quản lý người dùng
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === "products" ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              📚 Quản lý sản phẩm
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === "categories" ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              🏷️ Quản lý danh mục sản phẩm
            </button>
          </div>
        </nav>
      </div>

      <div className="flex-1 p-8">
        {activeTab === "orders" && (
          <OrdersTab orders={orders} updateOrderStatus={updateOrderStatus} addOrder={addOrder} />
        )}
        {activeTab === "users" && (
          <UsersTab users={users} addUser={addUser} updateUser={updateUser} deleteUser={deleteUser} />
        )}
        {activeTab === "products" && (
          <ProductsTab seedProducts={productsState} categories={categories} />
        )}
        {activeTab === "categories" && (
          <CategoriesTab
            categories={categories}
            addCategory={addCategory}
            updateCategory={updateCategory}
            deleteCategory={deleteCategory}
          />
        )}
      </div>
    </div>
  )
}

export default Admin
