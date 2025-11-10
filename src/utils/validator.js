export const requireFields = (obj, fields) => {
  const missing = fields.filter(f => !(f in obj));
  return missing;
};
