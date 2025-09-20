
export const PAYMENT_CONFIGS = {
    vnpay: {
        name: 'VNPAY',
        description: 'Ví điện tử VNPAY',
        logo: '🏛️',
        color: 'from-blue-600 to-blue-500',
        sandbox_url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
        test_config: {
            vnp_TmnCode: 'VNPAY_TEST',
            vnp_HashSecret: 'TEST_HASH_SECRET_KEY'
        }
    },
    momo: {
        name: 'MoMo',
        description: 'Ví điện tử MoMo',
        logo: '🎯',
        color: 'from-pink-600 to-pink-500',
        sandbox_url: 'https://test-payment.momo.vn',
        test_config: {
            partnerCode: 'MOMO_TEST',
            accessKey: 'TEST_ACCESS_KEY',
            secretKey: 'TEST_SECRET_KEY'
        }
    },
    zalopay: {
        name: 'ZaloPay',
        description: 'Ví điện tử ZaloPay',
        logo: '⚡',
        color: 'from-cyan-600 to-cyan-500',
        sandbox_url: 'https://sandbox.zalopay.vn',
        test_config: {
            appId: 'ZALOPAY_TEST',
            key1: 'TEST_KEY_1',
            key2: 'TEST_KEY_2'
        }
    },
    paypal: {
        name: 'PayPal',
        description: 'Thanh toán quốc tế',
        logo: '💎',
        color: 'from-blue-700 to-blue-600',
        sandbox_url: 'https://api.sandbox.paypal.com',
        test_config: {
            clientId: 'PAYPAL_CLIENT_ID',
            clientSecret: 'PAYPAL_CLIENT_SECRET'
        }
    },
    vietqr: {
        name: 'VietQR',
        description: 'QR Code ngân hàng',
        logo: '🏦',
        color: 'from-green-600 to-green-500',
        sandbox_url: 'Bank QR System',
        test_config: {
            bankCode: 'TEST_BANK',
            accountNumber: '1234567890'
        }
    }
};