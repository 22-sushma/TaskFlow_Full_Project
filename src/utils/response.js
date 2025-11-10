export const success = (res, data = {}, message = '') => res.json({ success: true, message, data });
export const fail = (res, message = '', code = 400) => res.status(code).json({ success: false, message });
