import cookies from 'cookie-handler';
import sha1 from 'crypto-js/sha1';
import {host} from './serverConfig';
import errorCode from './errorCode';

const {JSON, Promise, fetch} = window;

export default function (api, v, method, qs, data) {
    const token = cookies.get('_nji_tk_') || '';

    const qsStr = [];
    qs && qs.forEach((value, name) => {
        if (typeof name !== 'undefined' &&
                typeof value !== 'undefined') {
            qsStr.push(`${name}=${encodeURIComponent(value)}`);
        }
    });

    const dataStr = {};
    data && data.forEach((value, name) => {
        if (typeof name !== 'undefined' &&
                typeof value !== 'undefined') {
            dataStr[name] = value;
        }
    });

    const options = {
        method: method,
        mode: 'cors',
        credentials: 'include'
    };

    if (method === 'POST') {
        options.body = JSON.stringify(dataStr);
    }

    if (!api.startsWith('/')) {
        api = `/${api}`;
    }

    const now = Date.now();
    const sign = sha1(`${token}${options.body}${now}`);

    const url = `${host}${api}?sign=${sign}&v=${v}&t=${token}&${qsStr.join('&')}`;

    return fetch(url, options)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.resolve({
                    code: -1,
                    reason: ['SERVER_ERROR']
                });
            }
        }).then(result => {
            if (Number(result.code) === 0) {
                return Promise.resolve(result.data);
            } else {
                return Promise.reject(result.reason)
            }
        }).catch(reason => {
            return Promise.reject({
                globalError: reason.map(name => errorCode.get(name)).join('\n')
            });
        });
}