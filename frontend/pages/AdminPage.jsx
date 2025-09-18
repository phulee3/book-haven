import Header from "../components/Header"
import Admin from "../components/Admin"
import Footer from "../components/Footer"

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
  return (
    <div className="min-h-screen bg-gray-50">
      <Header setCurrentPage={setCurrentPage} cartCount={0} currentUser={currentUser} handleLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản trị viên</h1>
          <p className="text-gray-600">Quản lý đơn hàng, người dùng và sản phẩm</p>
          
        </div>

        <Admin
          orders={orders}
          updateOrderStatus={updateOrderStatus}
          addOrder={addOrder}
          users={users}
          addUser={addUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
          categories={categories}
          addCategory={addCategory}
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
        />
      </main>

      <Footer />
    </div>
  )
}

export default AdminPage
