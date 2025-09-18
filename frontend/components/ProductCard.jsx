"use client"

const ProductCard = ({ product, addToCart, showAddToCart = true }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ"
  }

  return (
    <div className=" overflow-hidden">
      <div className="relative">
        <img src={product.imageUrl || "/placeholder.svg"} alt={product.title} className="w-full h-40 sm:h-48 object-cover" />
        
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 h-10">{product.title}</h3>

        <div className="flex items-center space-x-2 mb-3">
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">{formatPrice(product.oldPrice)}</span>
          )}
          <span className="text-lg font-bold text-red-600">{formatPrice(product.price)}</span>
          {typeof product.discount === "number" && (
            <span className="ml-1 inline-block bg-red-600 text-white text-xs px-2 py-0.5 rounded">-{product.discount}%</span>
          )}
        </div>

        {showAddToCart && (
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Thêm giỏ hàng
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
