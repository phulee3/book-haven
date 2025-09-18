export function LoginModal({ 
  showLoginModal, 
  setShowLoginModal, 
  showRegister, 
  setShowRegister, 
  handleLogin, 
  handleRegister 
}) {
  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{showRegister ? "Đăng ký" : "Đăng nhập"}</h3>
          <button onClick={() => setShowLoginModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {!showRegister ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const email = formData.get("email")
              const password = formData.get("password")
              if (!handleLogin(email, password)) {
                alert("Email hoặc mật khẩu không đúng!")
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mật khẩu</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>Demo accounts:</p>
              <p>Admin: admin@bookhaven.com / 123456</p>
              <p>User: nguyenvana@email.com / 123456</p>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Hủy
              </button>
              <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Đăng nhập
              </button>
            </div>
            <div className="text-sm text-center">
              Chưa có tài khoản?{" "}
              <button type="button" className="text-blue-600 hover:underline" onClick={() => setShowRegister(true)}>
                Đăng ký
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const payload = {
                name: formData.get("name"),
                email: formData.get("email"),
                phone: formData.get("phone"),
                province: formData.get("province"),
                district: formData.get("district"),
                ward: formData.get("ward"),
                address: formData.get("address"),
              }
              const res = handleRegister(payload)
              if (!res.success) {
                alert(res.message)
                return
              }
              alert("Đăng ký thành công. Vui lòng đăng nhập!")
            }}
            className="space-y-3"
          >
            <input name="name" placeholder="Họ tên" className="w-full px-3 py-2 border border-gray-300 rounded" required />
            <input name="email" type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded" required />
            <input name="phone" placeholder="Điện thoại" className="w-full px-3 py-2 border border-gray-300 rounded" required />
            <div className="grid grid-cols-2 gap-3">
              <input name="province" placeholder="Tỉnh" className="px-3 py-2 border border-gray-300 rounded" required />
              <input name="district" placeholder="Huyện" className="px-3 py-2 border border-gray-300 rounded" required />
              <input name="ward" placeholder="Xã" className="px-3 py-2 border border-gray-300 rounded" required />
              <input name="address" placeholder="Địa chỉ" className="px-3 py-2 border border-gray-300 rounded col-span-2" required />
            </div>
            <div className="flex space-x-3">
              <button type="button" onClick={() => setShowRegister(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                Quay lại
              </button>
              <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Đăng ký
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
