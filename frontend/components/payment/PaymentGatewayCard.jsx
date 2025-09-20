
import React from 'react';

const PaymentGatewayCard = ({
    gateway,
    config,
    isSelected,
    onSelect,
    disabled = false
}) => {
    return (
        <div
            className={`
        relative cursor-pointer transition-all duration-300 transform
        bg-white border-2 rounded-xl p-6 text-center
        ${isSelected
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-102'
                }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
            onClick={() => !disabled && onSelect(gateway)}
        >
            <div className={`
        w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center
        text-2xl font-bold text-white bg-gradient-to-br ${config.color}
      `}>
                {config.logo}
            </div>

            <h3 className="font-semibold text-gray-800 mb-2">{config.name}</h3>
            <p className="text-sm text-gray-600">{config.description}</p>

            {isSelected && (
                <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentGatewayCard;
