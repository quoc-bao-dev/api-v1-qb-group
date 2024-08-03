import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { EmailData, sendEmail, templateMailOrder } from '../app/mailer';
import { convertUSDtoVND } from '../util/money';
import proxyObj from '../util/proxyObject';

const paymentController = {
    paymentMomo: async (req: Request, res: Response, next: NextFunction) => {
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        var accessKey = 'F8BBA842ECF85';
        var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        var orderInfo = 'pay with MoMo';
        var partnerCode = 'MOMO';
        var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
        var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
        var requestType = 'payWithMethod';
        var amount = '50000';
        var orderId = partnerCode + new Date().getTime();
        var requestId = orderId;
        var extraData = '';
        var orderGroupId = '';
        var autoCapture = true;
        var lang = 'vi';

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        const rawSignature =
            'accessKey=' +
            accessKey +
            '&amount=' +
            amount +
            '&extraData=' +
            extraData +
            '&ipnUrl=' +
            ipnUrl +
            '&orderId=' +
            orderId +
            '&orderInfo=' +
            orderInfo +
            '&partnerCode=' +
            partnerCode +
            '&redirectUrl=' +
            redirectUrl +
            '&requestId=' +
            requestId +
            '&requestType=' +
            requestType;
        //puts raw signature
        console.log('--------------------RAW SIGNATURE----------------');
        console.log(rawSignature);
        //signature
        const crypto = require('crypto');
        const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
        console.log('--------------------SIGNATURE----------------');
        console.log(signature);

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: 'Test',
            storeId: 'MomoTestStore',
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature,
        });
        ///
        const option = {
            method: 'POST',
            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
            data: requestBody,
        };
        try {
            const result = await axios(option);
            res.status(200).json(result.data);
        } catch (error) {
            next(error);
        }
    },

    paymentZalopay: async (req: Request, res: Response, next: NextFunction) => {
        const axios = require('axios').default; // npm install axios
        const CryptoJS = require('crypto-js'); // npm install crypto-js
        const moment = require('moment'); // npm install moment

        // APP INFO
        const config = {
            app_id: '2553',
            key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
            key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
            endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
        };

        const embed_data = {
            redirecturl: process.env.REDIRECT_URL,
        };

        // const items = [{}];
        const items = proxyObj.transformOrderItems(req.body.order);
        const transID = Math.floor(Math.random() * 1000000);
        const order: any = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: 'user123',
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: convertUSDtoVND(req.body.totalAmount),
            description: `Lazada - Payment for the order #${transID}`,
            callback_url: 'https://0822-1-52-83-198.ngrok-free.app/api/v1//payment/zalopay/callback',
            // bank_code: 'zalopayapp',
        };

        // appid|app_trans_id|appuser|amount|apptime|embeddata|item
        const data =
            config.app_id +
            '|' +
            order.app_trans_id +
            '|' +
            order.app_user +
            '|' +
            order.amount +
            '|' +
            order.app_time +
            '|' +
            order.embed_data +
            '|' +
            order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        try {
            const result = await axios.post(config.endpoint, null, { params: order });
            res.status(200).json({ ...result.data, app_trans_id: order.app_trans_id });
        } catch (error) {
            next(error);
        }
    },

    paymentZalopayCallback: async (req: Request, res: Response, next: NextFunction) => {
        let result: any = {};
        const config = {
            key2: 'eG4r0GcoNtRGbO8',
        };
        const CryptoJS = require('crypto-js'); //

        try {
            let dataStr = req.body.data;
            let reqMac = req.body.mac;

            let mac: any = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
            console.log('mac =', mac);

            // kiểm tra callback hợp lệ (đến từ ZaloPay server)
            if (reqMac !== mac) {
                // callback không hợp lệ
                result.return_code = -1;
                result.return_message = 'mac not equal';
            } else {
                // thanh toán thành công
                // merchant cập nhật trạng thái cho đơn hàng
                let dataJson = JSON.parse(dataStr, config.key2);
                console.log("update order's status = success where app_trans_id =", dataJson['app_trans_id']);

                result.return_code = 1;
                result.return_message = 'success';
            }
        } catch (ex) {
            result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
            result.return_message = ex.message;
        }

        // thông báo kết quả cho ZaloPay server
        res.json(result);
    },

    paymentZalopayStatus: async (req: Request, res: Response, next: NextFunction) => {
        // Node v10.15.3
        const axios = require('axios').default; // npm install axios
        const CryptoJS = require('crypto-js'); // npm install crypto-js
        const qs = require('qs');

        const config = {
            app_id: '2553',
            key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
            key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
            endpoint: 'https://sb-openapi.zalopay.vn/v2/query',
        };

        let postData: any = {
            app_id: config.app_id,
            app_trans_id: req.body.appTransId, // Input your app_trans_id
        };

        let data = postData.app_id + '|' + postData.app_trans_id + '|' + config.key1; // appid|app_trans_id|key1
        postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

        let postConfig = {
            method: 'post',
            url: config.endpoint,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify(postData),
        };

        try {
            const result = await axios(postConfig);
            res.status(200).json(result.data);
        } catch (error) {
            next(error);
        }
    },

    paymentSuccess: async (req: Request, res: Response, next: NextFunction) => {
        const data = {
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text,
            html: templateMailOrder({
                name: req.body.recipient,
            }),
        } as EmailData;
        try {
            await sendEmail(data);
            res.status(200).json({ success: true });
        } catch (error) {
            next(error);
        }
    },
};

export default paymentController;
