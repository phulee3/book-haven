import React from 'react';
import PaymentGatewayCard from './PaymentGatewayCard';
import { PAYMENT_CONFIGS } from './PaymentConfig';

const PaymentGatewaySelector = ({
    selectedGateway,
    onGatewaySelect,
    disabled = false,
    className = ""
}) => {
    return (
        <div className={`space-y-4 ${className}`}>
            <h3 className="text-lg font-semibold text-gray-800">
                Chọn phương thức thanh toán
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(PAYMENT_CONFIGS).map(([gateway, config]) => (
                    <PaymentGatewayCard
                        key={gateway}
                        gateway={gateway}
                        config={config}
                        isSelected={selectedGateway === gateway}
                        onSelect={onGatewaySelect}
                        disabled={disabled}
                    />
                ))}
            </div>

            {selectedGateway && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                        ✓ Đã chọn: <strong>{PAYMENT_CONFIGS[selectedGateway].name}</strong>
                        {' - '}
                        {PAYMENT_CONFIGS[selectedGateway].description}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PaymentGatewaySelector;