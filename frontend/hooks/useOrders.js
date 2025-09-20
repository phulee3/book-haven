"use client"

import { useState } from "react"
import toast from "react-hot-toast"

export const useOrders = () => {
    const [orders, setOrders] = useState([])

    const createOrder = (orderData) => {
        const newOrder = {
            id: Date.now(),
            ...orderData,
            status: "Pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        setOrders(prev => [newOrder, ...prev])

        toast.success("Đặt hàng thành công!", {
            icon: "🎉",
        })

        return newOrder
    }

    const addOrder = (orderData) => {
        const newOrder = {
            id: Date.now(),
            ...orderData,
            status: orderData.status || "Pending",
            createdAt: orderData.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        setOrders(prev => [newOrder, ...prev])
        return newOrder
    }

    const updateOrderStatus = (orderId, status) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === orderId
                    ? {
                        ...order,
                        status,
                        updatedAt: new Date().toISOString()
                    }
                    : order
            )
        )

        // Toast notification for status updates
        const statusMessages = {
            "Pending": "Đơn hàng đang chờ xử lý",
            "Processing": "Đơn hàng đang được xử lý",
            "Shipped": "Đơn hàng đã được gửi đi",
            "Delivered": "Đơn hàng đã được giao thành công",
            "Cancelled": "Đơn hàng đã bị hủy",
        }

        if (statusMessages[status]) {
            toast.success(statusMessages[status])
        }
    }

    const deleteOrder = (orderId) => {
        setOrders(prev => prev.filter(order => order.id !== orderId))
        toast.success("Đã xóa đơn hàng")
    }

    const getOrdersByUser = (userId) => {
        return orders.filter(order => order.userId === userId)
    }

    const getOrdersByStatus = (status) => {
        return orders.filter(order => order.status === status)
    }

    const getTotalRevenue = () => {
        return orders
            .filter(order => order.status === "Delivered")
            .reduce((total, order) => total + (order.total || 0), 0)
    }

    const getOrderStats = () => {
        const stats = {
            total: orders.length,
            pending: 0,
            processing: 0,
            shipped: 0,
            delivered: 0,
            cancelled: 0,
        }

        orders.forEach(order => {
            switch (order.status) {
                case "Pending":
                    stats.pending++
                    break
                case "Processing":
                    stats.processing++
                    break
                case "Shipped":
                    stats.shipped++
                    break
                case "Delivered":
                    stats.delivered++
                    break
                case "Cancelled":
                    stats.cancelled++
                    break
                default:
                    break
            }
        })

        return stats
    }

    return {
        orders,
        setOrders,
        createOrder,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        getOrdersByUser,
        getOrdersByStatus,
        getTotalRevenue,
        getOrderStats,
    }
}