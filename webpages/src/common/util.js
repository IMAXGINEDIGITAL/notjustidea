export function parseQuery(query) {
    const splits = query.split('&');
    const obj = {};
    
    splits.forEach(split => {
        const kv = split.split('=');
        obj[kv[0]] = decodeURIComponent(kv[1]);
    });

    return obj;
}