"use client"

import { useState } from "react"

const CategoriesTab = ({ categories, addCategory, updateCategory, deleteCategory }) => {
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) updateCategory(editing.id, form)
    else addCategory(form)
    setShowForm(false)
    setEditing(null)
    setForm({ name: "" })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Danh sách danh mục</h2>
          <p className="text-gray-600 mt-1">Tổng: {categories.length} danh mục</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Thêm danh mục</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên danh mục</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => { setEditing(category); setForm({ name: category.name }); setShowForm(true) }} className="text-blue-600 hover:text-blue-900">Sửa</button>
                    <button onClick={() => deleteCategory(category.id)} className="text-red-600 hover:text-red-900">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 backdrop-blur-[1px]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">{editing ? "Sửa danh mục" : "Thêm danh mục"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Tên danh mục" value={form.name} onChange={(e) => setForm({ name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" required />
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

export default CategoriesTab


