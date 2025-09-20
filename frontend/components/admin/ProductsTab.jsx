"use client"

import { useEffect, useState } from "react"
import { products as seedProducts } from "../../data/products"

const ProductsTab = ({ categories = [] }) => {
  // Initialize products with seedProducts or empty array
  const [products, setProducts] = useState(() => {
    if (!seedProducts || !Array.isArray(seedProducts)) {
      return []
    }
    return seedProducts.map((p) => ({
      ...p,
      categoryId: p.categoryId ?? (categories.length > 0 ? categories[0].id : 1),
    }))
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    oldPrice: 0,
    discount: 0,
    price: 0,
    categoryId: categories.length > 0 ? categories[0].id : 1
  })

  const itemsPerPage = 10

  // Update price when oldPrice or discount changes
  useEffect(() => {
    const base = Number(form.oldPrice) || 0
    const disc = Math.min(100, Math.max(0, Number(form.discount) || 0))
    const newPrice = Math.round(base * (1 - disc / 100))
    setForm((prev) => ({ ...prev, price: newPrice }))
  }, [form.oldPrice, form.discount])

  // Safe pagination function
  const paginate = (items = []) => {
    if (!Array.isArray(items)) return []
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }

  const totalPages = Math.max(1, Math.ceil((products?.length || 0) / itemsPerPage))
  const paginatedProducts = paginate(products)

  const formatPrice = (price) => {
    const numPrice = Number(price) || 0
    return new Intl.NumberFormat("vi-VN").format(numPrice) + "đ"
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editing) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...form } : p))
      )
    } else {
      const newProduct = {
        id: Date.now(),
        ...form,
        createdAt: new Date().toISOString()
      }
      setProducts((prev) => [...prev, newProduct])
    }

    // Reset form
    setShowForm(false)
    setEditing(null)
    setForm({
      title: "",
      imageUrl: "",
      oldPrice: 0,
      discount: 0,
      price: 0,
      categoryId: categories.length > 0 ? categories[0].id : 1
    })
  }

  const handleEdit = (product) => {
    setEditing(product)
    setForm({
      title: product.title || "",
      imageUrl: product.imageUrl || product.image || "",
      oldPrice: product.oldPrice || product.price || 0,
      discount: product.discount || 0,
      price: product.price || 0,
      categoryId: product.categoryId || (categories.length > 0 ? categories[0].id : 1)
    })
    setShowForm(true)
  }

  const handleDelete = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts((prev) => prev.filter((p) => p.id !== productId))
    }
  }

  const handleDiscountChange = (productId, newDiscount) => {
    const discount = Math.min(100, Math.max(0, Number(newDiscount) || 0))
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
            ...p,
            discount,
            price: p.oldPrice ? Math.round(p.oldPrice * (1 - discount / 100)) : p.price,
          }
          : p
      )
    )
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId)
    return category ? category.name : "Không có danh mục"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Danh sách sản phẩm</h2>
          <p className="text-gray-600 mt-1">Tổng: {products.length} sản phẩm</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >


          Thêm sản phẩm
        </button>
      </div>

      {/* Products List */}
      {
        products.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có sản phẩm nào</h3>
            <p className="text-gray-600">Thêm sản phẩm đầu tiên để bắt đầu quản lý</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên sản phẩm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá hiện tại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá gốc
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giảm giá (%)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {product.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded object-cover"
                              src={product.imageUrl || product.image || "/api/placeholder/40/40"}
                              alt={product.title}
                              onError={(e) => {
                                e.target.src = "/api/placeholder/40/40"
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                              {product.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getCategoryName(product.categoryId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.oldPrice ? formatPrice(product.oldPrice) : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={product.discount || 0}
                            onChange={(e) => handleDiscountChange(product.id, e.target.value)}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-500 ml-1">%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      className="h-16 w-16 rounded object-cover flex-shrink-0"
                      src={product.imageUrl || product.image || "/api/placeholder/64/64"}
                      alt={product.title}
                      onError={(e) => {
                        e.target.src = "/api/placeholder/64/64"
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{product.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{getCategoryName(product.categoryId)}</p>

                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div>
                          <span className="text-gray-600">Giá hiện tại:</span>
                          <div className="font-medium text-green-600">{formatPrice(product.price)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Giá gốc:</span>
                          <div className="font-medium">{product.oldPrice ? formatPrice(product.oldPrice) : "-"}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Giảm:</span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={product.discount || 0}
                            onChange={(e) => handleDiscountChange(product.id, e.target.value)}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-500">%</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Trang {currentPage} / {totalPages} ({products.length} sản phẩm)
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      Trước
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      Sau
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      }

      {/* Add/Edit Product Modal */}
      {
        showForm && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false)
                      setEditing(null)
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên sản phẩm *
                    </label>
                    <input
                      type="text"
                      placeholder="Tên sản phẩm"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL hình ảnh
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Danh mục *
                    </label>
                    <select
                      value={form.categoryId}
                      onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Giá gốc *
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={form.oldPrice}
                        onChange={(e) => setForm({ ...form, oldPrice: Number(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Giảm giá (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={form.discount}
                        onChange={(e) => setForm({ ...form, discount: Number(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Giá bán
                      </label>
                      <input
                        type="number"
                        value={form.price}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setEditing(null)
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {editing ? "Cập nhật" : "Thêm"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}

export default ProductsTab