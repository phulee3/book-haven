"use client"

import { useState, useMemo, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProductCard from "../components/ProductCard"
import { products } from "../data/products"

function CategoriesPage({
  setCurrentPage,
  addToCart,
  cartCount,
  currentUser,
  setShowLoginModal,
  handleLogout,
  handleSearch,
  categories,
  searchQuery,
  selectedCategory,
  setSelectedCategory,
}) {
  const [sortBy, setSortBy] = useState("newest")
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = products.filter((product) => {
        const titleMatch = product.title.toLowerCase().includes(q)
        const author = (product.author || "").toLowerCase()
        const authorMatch = author.includes(q)
        const words = q.split(" ")
        const tokenMatch = words.some((w) => product.title.toLowerCase().includes(w) || author.includes(w))
        return titleMatch || authorMatch || tokenMatch
      })
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case "newest":
        return [...filtered].sort(
          (a, b) => new Date(b.createdAt || "2024-01-01") - new Date(a.createdAt || "2024-01-01"),
        )
      case "priceDesc":
        return [...filtered].sort((a, b) => b.price - a.price)
      case "priceAsc":
        return [...filtered].sort((a, b) => a.price - b.price)
      default:
        return filtered
    }
  }, [searchQuery, selectedCategory, sortBy])

  useEffect(() => {
    setPage(1)
  }, [searchQuery, selectedCategory, sortBy])

  // Scroll to top when changing page, searching, or filtering
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    } catch (_) {
      window.scrollTo(0, 0)
    }
  }, [page, searchQuery, selectedCategory])

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / itemsPerPage))
  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return filteredAndSortedProducts.slice(start, start + itemsPerPage)
  }, [filteredAndSortedProducts, page])

  const getPageTitle = () => {
    if (searchQuery) {
      return `Kết quả tìm kiếm: "${searchQuery}"`
    }
    if (selectedCategory) {
      const keyToName = {
        children: "Sách thiếu nhi",
        "self-help": "Kỹ năng sống",
        business: "Kinh doanh",
        health: "Sức khỏe",
      }
      return keyToName[selectedCategory] || "Danh mục sách"
    }
    return "Tất cả sách"
  }

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

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-4">
              <h3 className="text-lg font-semibold mb-4">Danh mục sách</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedCategory(null)
                  }}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    !selectedCategory && !searchQuery ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"
                  }`}
                >
                  Tất cả sách
                </button>
                {[
                  { key: "children", name: "Sách thiếu nhi" },
                  { key: "self-help", name: "Kỹ năng sống" },
                  { key: "business", name: "Kinh doanh" },
                  { key: "health", name: "Sức khỏe" },
                ].map((category) => (
                  <button
                    key={category.key}
                    onClick={() => {
                      setSelectedCategory(category.key)
                    }}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedCategory === category.key ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:w-3/4">
            {/* Header with title and sorting */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-2xl font-bold mb-4 sm:mb-0">{getPageTitle()}</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sắp xếp theo:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="priceDesc">Giá giảm dần</option>
                  <option value="priceAsc">Giá tăng dần</option>
                </select>
              </div>
            </div>

            {/* Products grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginated.map((product) => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-600">
                      Trang {page} / {totalPages}
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-100"
                      >
                        Trước
                      </button>
                      <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-100"
                      >
                        Sau
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📚</div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">Không tìm thấy sách phù hợp</h3>
                <p className="text-gray-500">
                  {searchQuery ? `Không có kết quả cho "${searchQuery}"` : "Danh mục này chưa có sách nào"}
                </p>
              </div>
            )}

            {/* Results count */}
            <div className="mt-8 text-center text-gray-600">Hiển thị {filteredAndSortedProducts.length} sản phẩm</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CategoriesPage
