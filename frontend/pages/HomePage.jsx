import Header from "../components/Header"
import Banner from "../components/Banner"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { products } from "../data/products"
import { useRef } from "react"

const HomePage = ({
  setCurrentPage,
  addToCart,
  cartCount,
  currentUser,
  setShowLoginModal,
  handleLogout,
  handleSearch,
  navigateToCategory,
  categories,
}) => {
  const comboBestRef = useRef(null)

  const comboProducts = products.filter((p) => /combo/i.test(p.title))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        setCurrentPage={setCurrentPage}
        cartCount={cartCount}
        currentUser={currentUser}
        setShowLoginModal={setShowLoginModal}
        handleLogout={handleLogout}
        handleSearch={handleSearch}
      />
      <Banner />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left column: New Arrivals list (5 items, vertical) */}
          <div className="rounded-lg px-3 sm:px-4"> {/* Xóa pt-3 sm:pt-4 để bỏ padding trên cùng */}
          <div className="relative"> {/* Xóa mb-4 để bỏ margin dưới */}
              <div className="relative mb-4">
                <div className="absolute inset-0 h-8 bg-red-700"></div>
                <h2 className="relative z-10 text-white uppercase text-sm sm:text-base h-8 flex items-center px-3">🆕 SÁCH MỚI LÊN KỆ</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {products.slice(0, 3).map((p) => (
                  <ProductCard key={p.id} product={p} addToCart={addToCart} showAddToCart={false} />
                ))}
              </div>
              <div className="mb-3 flex justify-center">
                <button
                  type="button"
                  onClick={() => setCurrentPage && setCurrentPage("categories")}
                  className="text-red-700 hover:underline text-sm"
                >
                  Xem thêm
                </button>
              </div>
            </div>

            {/* Combo bán chạy */}
            <div className=" rounded-lg p-3 sm:p-4">
              <div className="relative mb-4">
                <div className="absolute inset-0 h-8 bg-red-700"></div>
                <h2 className="relative z-10 text-white uppercase text-sm sm:text-base h-8 flex items-center px-3">🔥 COMBO BÁN CHẠY</h2>
              </div>
              <div ref={comboBestRef} className="max-h-96 overflow-y-auto pr-1 space-y-4">
                {comboProducts.map((p) => (
                  <div key={p.id} className="flex items-center space-x-3">
                    <img src={p.imageUrl || "/placeholder.svg"} alt={p.title} className="w-14 h-18 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{p.title}</div>
                      <div className="flex items-center gap-2">
                        {p.oldPrice && (
                          <span className="text-xs text-gray-500 line-through">{new Intl.NumberFormat("vi-VN").format(p.oldPrice)}đ</span>
                        )}
                        <span className="text-sm font-semibold text-red-600">{new Intl.NumberFormat("vi-VN").format(p.price)}đ</span>
                        {typeof p.discount === "number" && (
                          <span className="inline-block bg-red-600 text-white text-[10px] px-2 py-0.5 rounded">-{p.discount}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-center">
                <button
                  type="button"
                  onClick={() => comboBestRef.current && comboBestRef.current.scrollBy({ top: 240, behavior: "smooth" })}
                  className="text-red-700 hover:underline text-sm"
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>

          {/* Right column: ads row + 3 blocks, each one row with 4 items */}
          <div className="lg:col-span-3 space-y-6">
            {/* Ads row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <a href="https://www.dienmayxanh.com/?srsltid=AfmBOopuF6ngz31jblCucVVIRSRjHRlxKVw_Fj-hUjpDRoXOrAPyI7Vb" target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative w-full pt-[100%]">
                  <img
                    src="https://cdn.tgdd.vn/News/0/OGImage(5)-845x442.jpg"
                    alt="Quảng cáo 1"
                    className="absolute inset-0 w-full h-full object-cover object-left rounded-md hover:opacity-90 transition"
                  />
                </div>
              </a>
              <a href="https://cellphones.com.vn/iphone-17-pro-max.html" target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative w-full pt-[100%]">
                  <img
                    src="https://nld.mediacdn.vn/291774122806476800/2025/9/11/cuc-gach-iphone-17-17575634713381676563468.jpg"
                    alt="Quảng cáo 2"
                    className="absolute inset-0 w-full h-full object-cover rounded-md hover:opacity-90 transition"
                  />
                </div>
              </a>
              <a href="http://xe.chotot.com/mua-ban-oto-bmw-sdcb9" target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative w-full pt-[100%]">
                  <img
                    src="https://i.ytimg.com/vi/Yz_XD-e4o60/sddefault.jpg"
                    alt="Quảng cáo 3"
                    className="absolute inset-0 w-full h-full object-cover object-right rounded-md hover:opacity-90 transition"
                  />
                </div>
              </a>
            </div>
            {/* Best Sellers */}
            <div className=" rounded-lg p-3 sm:p-4">
              <div className="relative mb-4">
                <div className="absolute inset-0 h-8 bg-red-700"></div>
                <h2 className="relative z-10 text-white uppercase text-sm sm:text-base h-8 flex items-center px-3">📚 TOP SÁCH BÁN CHẠY</h2>
                <button
                  type="button"
                  onClick={() => navigateToCategory && navigateToCategory(null)}
                  className="absolute right-3 top-1.5 z-10 text-white/90 hover:text-white text-xs sm:text-sm underline"
                >
                  Xem tất cả
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} addToCart={addToCart} />
                ))}
              </div>
            </div>

            {/* Life Skills */}
            <div className=" rounded-lg p-3 sm:p-4">
              <div className="relative mb-4">
                <div className="absolute inset-0 h-8 bg-red-700"></div>
                <h2 className="relative z-10 text-white uppercase text-sm sm:text-base h-8 flex items-center px-3">💡 SÁCH KỸ NĂNG SỐNG</h2>
                <button
                  type="button"
                  onClick={() => navigateToCategory && navigateToCategory("self-help")}
                  className="absolute right-3 top-1.5 z-10 text-white/90 hover:text-white text-xs sm:text-sm underline"
                >
                  Xem tất cả
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products
                  .filter((p) => p.category === "self-help")
                  .slice(0, 4)
                  .map((p) => (
                    <ProductCard key={p.id} product={p} addToCart={addToCart} />
                  ))}
              </div>
            </div>

            {/* Children */}
            <div className=" rounded-lg p-3 sm:p-4">
              <div className="relative mb-4">
                <div className="absolute inset-0 h-8 bg-red-700"></div>
                <h2 className="relative z-10 text-white uppercase text-sm sm:text-base h-8 flex items-center px-3">🧒 SÁCH THIẾU NHI</h2>
                <button
                  type="button"
                  onClick={() => navigateToCategory && navigateToCategory("children")}
                  className="absolute right-3 top-1.5 z-10 text-white/90 hover:text-white text-xs sm:text-sm underline"
                >
                  Xem tất cả
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products
                  .filter((p) => p.category === "children")
                  .slice(0, 4)
                  .map((p) => (
                    <ProductCard key={p.id} product={p} addToCart={addToCart} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
