"use client"

import { useEffect, useState } from "react"
import Pagination from "./Pagination"

const ProductsTab = ({ seedProducts, categories }) => {
  const [products, setProducts] = useState(() => seedProducts)
  const [currentPage, setCurrentPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: "", imageUrl: "", oldPrice: 0, discount: 0, price: 0, categoryId: categories?.[0]?.id || 1 })
  const itemsPerPage = 5

  useEffect(() => {
    const base = Number(form.oldPrice) || 0
    const disc = Math.min(100, Math.max(0, Number(form.discount) || 0))
    setForm((prev) => ({ ...prev, price: Math.round(base * (1 - disc / 100)) }))
  }, [form.oldPrice, form.discount])

  const paginate = (items) => items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage) || 1
  const formatPrice = (p) => new Intl.NumberFormat("vi-VN").format(p) + "đ"

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">Tổng: {products.length} sản phẩm</div>
          <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Thêm sản phẩm</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá cũ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Giảm giá</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginate(products).map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-[220px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {product.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{categories.find((c) => c.id === product.categoryId)?.name || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.oldPrice ? formatPrice(product.oldPrice) : "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="number" min="0" max="100" value={product.discount || 0} className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                      onChange={(e) => {
                        const discount = Math.min(100, Math.max(0, Number.parseInt(e.target.value) || 0))
                        setProducts((prev) => prev.map((p) => p.id === product.id ? { ...p, discount, price: p.oldPrice ? Math.round(p.oldPrice * (1 - discount / 100)) : p.price } : p))
                      }} />
                    <span className="text-sm text-gray-500 ml-1">%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => { setEditing(product); setForm({ title: product.title, imageUrl: product.imageUrl || "", oldPrice: product.oldPrice || product.price, discount: product.discount || 0, price: product.price, categoryId: product.categoryId }); setShowForm(true) }} className="text-blue-600 hover:text-blue-900">Sửa</button>
                    <button onClick={() => setProducts((prev) => prev.filter((p) => p.id !== product.id))} className="text-red-600 hover:text-red-900">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />)}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 backdrop-blur-[1px]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{editing ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h3>
            <form onSubmit={(e) => { e.preventDefault(); if (editing) setProducts((prev) => prev.map((p) => p.id === editing.id ? { ...p, ...form } : p)); else setProducts((prev) => [...prev, { id: Date.now(), ...form }]); setShowForm(false); setEditing(null); setForm({ title: "", imageUrl: "", oldPrice: 0, discount: 0, price: 0, categoryId: categories?.[0]?.id || 1 }) }} className="space-y-4">
              <input type="text" placeholder="Tên sản phẩm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" required />
              <input type="url" placeholder="Ảnh (URL)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" />
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: isNaN(+e.target.value) ? e.target.value : +e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" required>
                {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
              </select>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Giá cũ</label>
                  <input type="number" min="0" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: Number(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-300 rounded" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Giảm (%)</label>
                  <input type="number" min="0" max="100" value={form.discount} onChange={(e) => setForm({ ...form, discount: Number(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-300 rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Giá mới</label>
                  <input type="number" value={form.price} readOnly className="w-full px-3 py-2 border border-gray-200 rounded bg-gray-50" />
                </div>
              </div>
              <div className="flex space-x-3">
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Hủy</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editing ? "Cập nhật" : "Thêm"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsTab


