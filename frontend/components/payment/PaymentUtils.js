
import { PAYMENT_CONFIGS } from './PaymentConfig';

export const generateTransactionId = () => {
    return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export const formatCurrency = (amount, currency = 'VND') => {
    if (currency === 'VND') {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

export const convertVNDToUSD = (vndAmount, rate = 24000) => {
    return (vndAmount / rate).toFixed(2);
};

// Payment creation functions
export const createVNPayPayment = (amount, orderInfo, returnUrl = '') => {
    const txnId = generateTransactionId();

    const vnpayData = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: PAYMENT_CONFIGS.vnpay.test_config.vnp_TmnCode,
        vnp_Amount: parseInt(amount) * 100,
        vnp_CurrCode: 'VND',
        vnp_TxnRef: txnId,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: 'other',
        vnp_ReturnUrl: returnUrl || 'http://localhost:3000/payment/vnpay/callback',
        vnp_IpAddr: '127.0.0.1',
        vnp_CreateDate: new Date().toISOString().replace(/[-T:]/g, '').split('.')[0]
    };

    const paymentUrl = `${PAYMENT_CONFIGS.vnpay.sandbox_url}?${new URLSearchParams(vnpayData).toString()}`;

    return {
        gateway: 'VNPAY',
        amount: amount,
        currency: 'VND',
        transactionId: txnId,
        paymentUrl: paymentUrl,
        orderInfo: orderInfo,
        qrData: paymentUrl
    };
};

export const createMoMoPayment = (amount, orderInfo, returnUrl = '') => {
    const txnId = generateTransactionId();

    const momoData = {
        partnerCode: PAYMENT_CONFIGS.momo.test_config.partnerCode,
        requestId: txnId,
        amount: parseInt(amount),
        orderId: txnId,
        orderInfo: orderInfo,
        redirectUrl: returnUrl || 'http://localhost:3000/payment/momo/callback',
        ipnUrl: 'http://localhost:3000/payment/momo/notify',
        requestType: 'payWithATM',
        extraData: ''
    };

    const deepLink = `momo://payment?data=${encodeURIComponent(JSON.stringify(momoData))}`;

    return {
        gateway: 'MoMo',
        amount: amount,
        currency: 'VND',
        transactionId: txnId,
        deepLink: deepLink,
        orderInfo: orderInfo,
        qrData: deepLink
    };
};

export const createZaloPayPayment = (amount, orderInfo, returnUrl = '') => {
    const txnId = generateTransactionId();

    const zaloData = {
        app_id: PAYMENT_CONFIGS.zalopay.test_config.appId,
        app_trans_id: txnId,
        amount: parseInt(amount),
        description: orderInfo,
        callback_url: returnUrl || 'http://localhost:3000/payment/zalopay/callback'
    };

    const deepLink = `zalopay://payment?data=${encodeURIComponent(JSON.stringify(zaloData))}`;

    return {
        gateway: 'ZaloPay',
        amount: amount,
        currency: 'VND',
        transactionId: txnId,
        deepLink: deepLink,
        orderInfo: orderInfo,
        qrData: deepLink
    };
};

export const createPayPalPayment = (amount, orderInfo, returnUrl = '') => {
    const txnId = generateTransactionId();
    const usdAmount = convertVNDToUSD(amount);

    const paypalData = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: usdAmount
            },
            description: orderInfo
        }],
        application_context: {
            return_url: returnUrl || 'http://localhost:3000/payment/paypal/success',
            cancel_url: 'http://localhost:3000/payment/paypal/cancel'
        }
    };

    const paymentUrl = `${PAYMENT_CONFIGS.paypal.sandbox_url}/v2/checkout/orders`;

    return {
        gateway: 'PayPal',
        amount: usdAmount,
        currency: 'USD',
        transactionId: txnId,
        paymentUrl: paymentUrl,
        orderInfo: orderInfo,
        qrData: `PayPal Payment: ${paymentUrl}`
    };
};

export const createVietQRPayment = (amount, orderInfo, bankCode = '', accountNumber = '') => {
    const txnId = generateTransactionId();

    const vietQRData = {
        bankCode: bankCode || PAYMENT_CONFIGS.vietqr.test_config.bankCode,
        accountNumber: accountNumber || PAYMENT_CONFIGS.vietqr.test_config.accountNumber,
        amount: parseInt(amount),
        description: orderInfo,
        transactionId: txnId
    };

    const qrString = `VietQR|${vietQRData.bankCode}|${vietQRData.accountNumber}|${vietQRData.amount}|${vietQRData.description}|${vietQRData.transactionId}`;

    return {
        gateway: 'VietQR',
        amount: amount,
        currency: 'VND',
        transactionId: txnId,
        bankCode: vietQRData.bankCode,
        accountNumber: vietQRData.accountNumber,
        orderInfo: orderInfo,
        qrData: qrString
    };
};

// Main payment creation function
export const createPayment = (gateway, amount, orderInfo, options = {}) => {
    switch (gateway) {
        case 'vnpay':
            return createVNPayPayment(amount, orderInfo, options.returnUrl);
        case 'momo':
            return createMoMoPayment(amount, orderInfo, options.returnUrl);
        case 'zalopay':
            return createZaloPayPayment(amount, orderInfo, options.returnUrl);
        case 'paypal':
            return createPayPalPayment(amount, orderInfo, options.returnUrl);
        case 'vietqr':
            return createVietQRPayment(amount, orderInfo, options.bankCode, options.accountNumber);
        default:
            throw new Error(`Unsupported payment gateway: ${gateway}`);
    }
};
