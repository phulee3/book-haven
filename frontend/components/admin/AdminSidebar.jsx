"use client"

const AdminSidebar = ({
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    orders,
    users
}) => {
    const menuItems = [
        {
            id: "dashboard",
            name: "Tổng quan",
            icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z",
            count: null
        },
        {
            id: "orders",
            name: "Quản lý đơn hàng",
            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
            count: orders?.length || 0
        },
        {
            id: "users",
            name: "Quản lý người dùng",
            icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
            count: users?.length || 0
        },
        {
            id: "products",
            name: "Quản lý sản phẩm",
            icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
            count: null
        },
        {
            id: "categories",
            name: "Quản lý danh mục",
            icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
            count: null
        }
    ]

    const handleMenuClick = (tabId) => {
        setActiveTab(tabId)
        setSidebarOpen(false) // Close sidebar on mobile after selection
    }

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:top-16 lg:bg-white lg:border-r lg:border-gray-200">
                <div className="flex flex-col flex-1 min-h-0">
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleMenuClick(item.id)}
                                className={`group flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === item.id
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <svg
                                    className={`mr-3 h-5 w-5 ${activeTab === item.id ? "text-blue-500" : "text-gray-400"
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                </svg>
                                <span className="flex-1 text-left">{item.name}</span>
                                {item.count !== null && (
                                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${activeTab === item.id
                                        ? "bg-blue-200 text-blue-800"
                                        : "bg-gray-100 text-gray-600"
                                        }`}>
                                        {item.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="px-4 py-6 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.id)}
                            className={`group flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${activeTab === item.id
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <svg
                                className={`mr-3 h-5 w-5 ${activeTab === item.id ? "text-blue-500" : "text-gray-400"
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            <span className="flex-1 text-left">{item.name}</span>
                            {item.count !== null && (
                                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${activeTab === item.id
                                    ? "bg-blue-200 text-blue-800"
                                    : "bg-gray-100 text-gray-600"
                                    }`}>
                                    {item.count}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>
        </>
    )
}

export default AdminSidebar