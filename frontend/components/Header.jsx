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
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      handleSearch(searchInput.trim());
      setShowMobileSearch(false);
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
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-7 py-2 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer shrink-0"
            onClick={() => setCurrentPage("home")}
          >
            <img
              src="/logo.jpg"
              alt="BookHaven"
              className="object-contain h-8 sm:h-10 lg:h-12 w-auto"
            />
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-3xl mx-4">
            <div className="w-full">
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
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                    className="w-full h-full pl-10 pr-4 border-0 focus:outline-none focus:ring-0 text-sm placeholder-gray-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="px-6 bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 text-gray-700 hover:text-red-600"
          >
            <span className="text-xl">🔍</span>
          </button>

          {/* Right menu */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            {/* Order tracking */}
            <button
              type="button"
              className="flex flex-col items-center text-gray-700 hover:text-red-600"
            >
              <span className="text-xl lg:text-2xl">📞</span>
              <div className="text-xs lg:text-sm leading-tight text-center hidden sm:block">
                <div className="font-medium">Tra cứu đơn hàng</div>
              </div>
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={handleCartClick}
              className="flex flex-col items-center text-gray-700 hover:text-red-600 relative"
            >
              <span className="text-xl lg:text-2xl">🛒</span>
              <div className="text-xs lg:text-sm leading-tight text-center hidden sm:block">
                <div className="font-medium">Giỏ hàng</div>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] lg:text-[11px] rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Account */}
            <div className="relative">
              <button
                type="button"
                onClick={handleAccountClick}
                className="flex flex-col items-center text-gray-700 hover:text-red-600 relative"
              >
                <span className="text-xl lg:text-2xl">👤</span>
                <div className="text-xs lg:text-sm leading-tight text-center hidden sm:block">
                  <div className="font-medium truncate max-w-20">
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

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden mt-3 pb-2">
            <div className="w-full">
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
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                    className="w-full h-full pl-10 pr-4 border-0 focus:outline-none focus:ring-0 text-sm placeholder-gray-400"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="px-4 bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Tìm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top bar */}
      <div className="bg-rose-50 py-2">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-7">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 place-items-center text-gray-700 text-[11px] sm:text-[13px]">

            <button
              type="button"
              className="flex items-center gap-1 sm:gap-2 hover:text-red-600 px-2 py-1"
              onClick={() => handleSearch("")}
            >
              <span className="text-red-600">≡</span>
              <span className="font-medium whitespace-nowrap">DANH MỤC SÁCH</span>
            </button>

            <div className="flex items-center gap-1 sm:gap-2 px-2 py-1">
              <span className="text-red-600">👁️</span>
              <span className="whitespace-nowrap">Sản phẩm đã xem</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 px-2 py-1">
              <span className="text-red-600">🚚</span>
              <span className="whitespace-nowrap text-center">Ship COD Toàn Quốc</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 px-2 py-1">
              <span className="text-red-600">🎁</span>
              <span className="whitespace-nowrap">Free Ship Trên 500k</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 px-2 py-1">
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