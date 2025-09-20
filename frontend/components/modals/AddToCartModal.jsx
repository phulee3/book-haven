"use client"

import { useState, useEffect } from "react"

export const AddToCartModal = ({
    showModal,
    setShowModal,
    selectedProduct,
    selectedQuantity,
    setSelectedQuantity,
    confirmAddToCart,
}) => {
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (showModal) {
            setIsAnimating(true)
        }
    }, [showModal])

    const handleClose = () => {
        setIsAnimating(false)
        setTimeout(() => setShowModal(false), 150)
    }

    const handleConfirm = () => {
        confirmAddToCart()
        handleClose()
    }

    if (!showModal) return null

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-150 ${isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                className={`relative bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all duration-150 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900">
                        Thêm vào giỏ hàng
                    </h3>
                    <button
                        onClick={handleClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {selectedProduct && (
                        <div className="flex gap-4 mb-6">
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src={selectedProduct.image || "/api/placeholder/80/80"}
                                    alt={selectedProduct.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                                    {selectedProduct.title}
                                </h4>
                                <p className="text-sm text-gray-500 mb-2">
                                    {selectedProduct.author && `Tác giả: ${selectedProduct.author}`}
                                </p>
                                <div className="flex items-center gap-2">
                                    {selectedProduct.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                            {selectedProduct.originalPrice.toLocaleString()}đ
                                        </span>
                                    )}
                                    <span className="text-lg font-semibold text-red-600">
                                        {selectedProduct.price.toLocaleString()}đ
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Số lượng
                        </label>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                                disabled={selectedQuantity <= 1}
                                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>

                            <div className="flex items-center">
                                <input
                                    type="number"
                                    value={selectedQuantity}
                                    onChange={(e) => {
                                        const value = Math.max(1, parseInt(e.target.value) || 1)
                                        setSelectedQuantity(value)
                                    }}
                                    className="w-16 text-center text-lg font-medium border-0 focus:ring-0 bg-transparent"
                                    min="1"
                                />
                            </div>

                            <button
                                onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Total */}
                    {selectedProduct && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Tổng cộng:</span>
                                <span className="text-xl font-bold text-red-600">
                                    {(selectedProduct.price * selectedQuantity).toLocaleString()}đ
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={handleClose}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    )
}