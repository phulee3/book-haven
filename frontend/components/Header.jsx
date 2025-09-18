"use client";

import { useState } from "react";

const Header = ({
  setCurrentPage,
  cartCount,
  currentUser,
  setShowLoginModal,
  handleLogout,
  handleSearch,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      handleSearch(searchInput.trim());
    }
  };

  const handleAccountClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleCartClick = () => {
    if (currentUser) {
      setCurrentPage("cart");
    } else if (typeof setShowLoginModal === "function") {
      setShowLoginModal(true);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Main header */}
      <div className="max-w-7xl mx-7 px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage("home")}
          >
            <img
              src="/logo.jpg"
              alt="BookHaven"
              className="object-contain scale-125 "
            />
          </div>

          {/* Search */}
          <div className="flex-1 max-w-3xl mx-4">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="flex h-10 rounded-md overflow-hidden border border-red-600 bg-white">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm kiếm sách, tác giả..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full h-full pl-10 pr-4 border-0 focus:outline-none focus:ring-0 text-sm placeholder-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>

          {/* Right menu */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="flex flex-col items-center text-gray-700 hover:text-red-600"
            >
              <span className="text-2xl">📞</span>
              <div className="text-sm leading-tight text-center">
                <div className="font-medium">Tra cứu đơn hàng</div>
              </div>
            </button>

            <button
              type="button"
              onClick={handleCartClick}
              className="flex flex-col items-center text-gray-700 hover:text-red-600 relative"
            >
              <span className="text-2xl">🛒</span>
              <div className="text-sm leading-tight text-center">
                <div className="font-medium">Giỏ hàng</div>
              </div>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[11px] rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={handleAccountClick}
                className="flex flex-col items-center text-gray-700 hover:text-red-600 relative"
              >
                <span className="text-2xl">👤</span>
                <div className="text-sm leading-tight text-center">
                  <div className="font-medium">
                    {currentUser ? currentUser.name : "Tài khoản"}
                  </div>
                </div>
              </button>

              {/* User dropdown menu */}
              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {!currentUser && (
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          setShowLoginModal(true);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng nhập
                      </button>
                    )}
                    {currentUser && (
                      <>
                        <button
                          onClick={() => {
                            setShowMenu(false);
                            setCurrentPage(
                              currentUser.role === "admin" ? "admin" : "account"
                            );
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {currentUser.role === "admin"
                            ? "Quản trị"
                            : "Tài khoản"}
                        </button>
                        <button
                          onClick={() => {
                            setShowMenu(false);
                            handleLogout();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Đăng xuất
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top bar */}
      <div className="bg-rose-50 py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 place-items-center text-[13px] text-gray-700 gap-3">
            <button
              type="button"
              className="flex items-center gap-2 hover:text-red-600"
              onClick={() => handleSearch("")}
            >
              <span className="text-red-600">≡</span>
              <span className="font-medium">DANH MỤC SÁCH</span>
            </button>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-red-600">👁️</span>
              <span>Sản phẩm đã xem</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-red-600">🚚</span>
              <span>Ship COD Trên Toàn Quốc</span>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-red-600">🎁</span>
              <span>Free Ship Đơn Hàng Trên 500k</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600">📞</span>
              <span className="font-medium">0934872369</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
