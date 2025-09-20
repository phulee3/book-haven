"use client"

import { useState } from "react"
import AdminSidebar from "../components/admin/AdminSidebar"
import AdminContent from "../components/admin/AdminContent"

const AdminPage = ({
  setCurrentPage,
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
  currentUser,
  handleLogout,
}) => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const adminProps = {
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
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          orders={orders}
          users={users}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg font-semibold text-gray-900">
                Quản trị viên
              </h1>
              <div className="w-10" /> {/* Spacer */}
            </div>
          </div>

          {/* Content Area */}
          <main className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Desktop Header */}
              <div className="hidden lg:block mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Quản trị viên
                </h1>
                <p className="text-gray-600">
                  Quản lý đơn hàng, người dùng và sản phẩm
                </p>
              </div>

              <AdminContent
                activeTab={activeTab}
                {...adminProps}
              />
            </div>
          </main>
        </div>
      </div>

    </div>
  )
}

export default AdminPage