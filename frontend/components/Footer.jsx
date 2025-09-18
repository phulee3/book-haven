const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and contact */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">📖</span>
              <span className="text-xl font-bold">BookHaven</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>0987654321</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <span>contact@bookhaven.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>KMTD, Đường Nguyễn Trãi, Q. Hà Đông, Hà Nội</span>
              </div>
            </div>
          </div>

          {/* News */}
          <div>
            <h3 className="font-semibold mb-4">TIN TỨC</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-300">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Sự kiện
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Tin khuyến mãi
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="font-semibold mb-4">HỖ TRỢ KHÁCH HÀNG</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-300">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Phương thức thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Phương thức giao hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Bảo mật thông tin
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold mb-4">THÔNG TIN</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-300">
                  Đăng nhập
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Đăng ký
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Tra cứu đơn hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social media and shipping */}
        <div className="border-t border-blue-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm">MẠNG XÃ HỘI</span>
              <div className="flex space-x-3">
                <a href="#" className="text-blue-300 hover:text-white">
                  📘
                </a>
                <a href="#" className="text-blue-300 hover:text-white">
                  📱
                </a>
                <a href="#" className="text-blue-300 hover:text-white">
                  📷
                </a>
                <a href="#" className="text-blue-300 hover:text-white">
                  📺
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">VẬN CHUYỂN</span>
              <div className="flex space-x-2">
                <div className="bg-green-600 px-2 py-1 rounded text-xs">🚚 Ahamove</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
