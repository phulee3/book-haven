"use client"

import { useState } from "react"
import Pagination from "./Pagination"

const UsersTab = ({ users, addUser, updateUser, deleteUser }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showUserForm, setShowUserForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [userForm, setUserForm] = useState({ name: "", email: "", phone: "", province: "", district: "", ward: "", address: "" })
  const itemsPerPage = 5

  const paginate = (items) => items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil((users?.length || 0) / itemsPerPage) || 1

  const startEditUser = (user) => {
    setEditingUser(user)
    setUserForm({ name: user.name, email: user.email, phone: user.phone, province: user.province || "", district: user.district || "", ward: user.ward || "", address: user.address || "" })
    setShowUserForm(true)
  }

  const handleUserSubmit = (e) => {
    e.preventDefault()
    if (editingUser) updateUser(editingUser.id, userForm)
    else addUser(userForm)
    setShowUserForm(false)
    setEditingUser(null)
    setUserForm({ name: "", email: "", phone: "", province: "", district: "", ward: "", address: "" })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h2>
        <button onClick={() => setShowUserForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Thêm người dùng</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điện thoại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa chỉ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginate(users).map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.province}, {user.district}, {user.ward}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => startEditUser(user)} className="text-blue-600 hover:text-blue-900">Sửa</button>
                    <button onClick={() => deleteUser(user.id)} className="text-red-600 hover:text-red-900">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        )}
      </div>

      {showUserForm && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 backdrop-blur-[1px]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">{editingUser ? "Sửa người dùng" : "Thêm người dùng"}</h3>
            <form onSubmit={handleUserSubmit} className="space-y-4">
              <input type="text" placeholder="Tên" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" required />
              <input type="email" placeholder="Email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" required />
              <input type="tel" placeholder="Điện thoại" value={userForm.phone} onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" required />
              <input type="text" placeholder="Tỉnh" value={userForm.province} onChange={(e) => setUserForm({ ...userForm, province: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" required />
              <input type="text" placeholder="Huyện" value={userForm.district} onChange={(e) => setUserForm({ ...userForm, district: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" required />
              <input type="text" placeholder="Xã" value={userForm.ward} onChange={(e) => setUserForm({ ...userForm, ward: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" required />
              <input type="text" placeholder="Địa chỉ cụ thể" value={userForm.address} onChange={(e) => setUserForm({ ...userForm, address: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded" required />
              <div className="flex space-x-3">
                <button type="button" onClick={() => { setShowUserForm(false); setEditingUser(null); }} className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Hủy</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{editingUser ? "Cập nhật" : "Thêm"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersTab


