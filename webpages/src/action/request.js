import fetchapi from '../common/fetchapi';

export default function request({
    api,
    v,
    method,
    qs,
    data,
    errs
}) {
    return new Promise((resolve, reject) => {
        if (Object.values(errs).filter(s => s).length > 0) {
            reject(errs);
        } else {
            fetchapi(api, v, method, qs, data)
                .then(resolve)
                .catch(err => {
                    if (err instanceof Error) {
                        reject(err);
                    } else {
                        Object.assign(errs, err);
                        reject(errs);
                    }
                });
        }
    });
}