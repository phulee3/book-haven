
import React, { useState } from 'react';
import PaymentGatewaySelector from './PaymentGatewaySelector';
import { createPayment, formatCurrency } from './PaymentUtils';

const PaymentForm = ({
    onPaymentCreate,
    initialAmount = '',
    initialOrderInfo = '',
    className = ""
}) => {
    const [amount, setAmount] = useState(initialAmount);
    const [orderInfo, setOrderInfo] = useState(initialOrderInfo);
    const [selectedGateway, setSelectedGateway] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedGateway || !amount || !orderInfo) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        setIsProcessing(true);

        try {
            const paymentData = createPayment(selectedGateway, amount, orderInfo);
            onPaymentCreate && onPaymentCreate(paymentData);
        } catch (error) {
            console.error('Payment creation error:', error);
            alert('Có lỗi xảy ra khi tạo thanh toán!');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Thông tin thanh toán
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Amount Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số tiền *
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập số tiền"
                                min="1000"
                                step="1000"
                                required
                            />
                            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                VND
                            </span>
                        </div>
                        {amount && (
                            <p className="mt-1 text-sm text-gray-600">
                                {formatCurrency(amount)}
                            </p>
                        )}
                    </div>

                    {/* Order Info Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nội dung thanh toán *
                        </label>
                        <input
                            type="text"
                            value={orderInfo}
                            onChange={(e) => setOrderInfo(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Mô tả đơn hàng"
                            required
                        />
                    </div>

                    {/* Payment Gateway Selector */}
                    <PaymentGatewaySelector
                        selectedGateway={selectedGateway}
                        onGatewaySelect={setSelectedGateway}
                        disabled={isProcessing}
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!selectedGateway || !amount || !orderInfo || isProcessing}
                        className={`
              w-full py-4 px-6 rounded-lg font-semibold text-white
              transition-all duration-200 transform
              ${!selectedGateway || !amount || !orderInfo || isProcessing
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg'
                            }
            `}
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang xử lý...
                            </span>
                        ) : (
                            '💳 Tiến hành thanh toán'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;