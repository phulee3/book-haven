"use client"

import Header from "../components/Header"
import Footer from "../components/Footer"
import { useState } from "react"

const AccountPage = ({ setCurrentPage, currentUser, updateUser, deleteUser, handleLogout }) => {
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    province: currentUser?.province || "",
    district: currentUser?.district || "",
    ward: currentUser?.ward || "",
    address: currentUser?.address || "",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setCurrentPage={setCurrentPage} currentUser={currentUser} cartCount={0} handleLogout={handleLogout} />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tài khoản của tôi</h1>

        <form
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            updateUser(currentUser.id, form)
            alert("Cập nhật thông tin thành công")
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="px-3 py-2 border border-gray-300 rounded"
              placeholder="Họ tên"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="px-3 py-2 border border-gray-300 rounded"
              placeholder="Email"
              value={form.email}
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="px-3 py-2 border border-gray-300 rounded"
              placeholder="Điện thoại"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <input
              className="px-3 py-2 border border-gray-300 rounded"
              placeholder="Tỉnh"
              value={form.province}
              onChange={(e) => setForm({ ...form, province: e.target.value })}
              required
            />
            <input
              className="px-3 py-2 border border-gray-300 rounded"
              placeholder="Huyện"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              required
            />
            <input
              className="px-3 py-2 border border-gray-300 rounded"
              placeholder="Xã"
              value={form.ward}
              onChange={(e) => setForm({ ...form, ward: e.target.value })}
              required
            />
          </div>
          <input
            className="px-3 py-2 border border-gray-300 rounded w-full"
            placeholder="Địa chỉ cụ thể"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Lưu thay đổi
            </button>
            <button type="button" onClick={handleLogout} className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
              Đăng xuất
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm("Bạn có chắc muốn xóa tài khoản?")) {
                  deleteUser(currentUser.id)
                }
              }}
              className="ml-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Xóa tài khoản
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}

export default AccountPage


