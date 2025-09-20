"use client"

import DashboardTab from "./DashboardTab"
import OrdersTab from "./OrdersTab"
import UsersTab from "./UsersTab"
import ProductsTab from "./ProductsTab"
import CategoriesTab from "./CategoriesTab"

const AdminContent = ({
    activeTab,
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
}) => {
    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return (
                    <DashboardTab
                        orders={orders}
                        users={users}
                        categories={categories}
                    />
                )

            case "orders":
                return (
                    <OrdersTab
                        orders={orders}
                        updateOrderStatus={updateOrderStatus}
                        addOrder={addOrder}
                    />
                )

            case "users":
                return (
                    <UsersTab
                        users={users}
                        addUser={addUser}
                        updateUser={updateUser}
                        deleteUser={deleteUser}
                    />
                )

            case "products":
                return (
                    <ProductsTab
                        categories={categories}
                    />
                )

            case "categories":
                return (
                    <CategoriesTab
                        categories={categories}
                        addCategory={addCategory}
                        updateCategory={updateCategory}
                        deleteCategory={deleteCategory}
                    />
                )

            default:
                return (
                    <DashboardTab
                        orders={orders}
                        users={users}
                        categories={categories}
                    />
                )
        }
    }

    return (
        <div className="w-full">
            {renderContent()}
        </div>
    )
}

export default AdminContent