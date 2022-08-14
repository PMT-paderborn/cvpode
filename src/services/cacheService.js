const KEYNAME = "cpvcodes";

const getAllCache = () => {
  return JSON.parse(localStorage.getItem(KEYNAME)) ?? [];
};

const getCached = (code) => {
  let items = getAllCache();
  return items.find((item) => item.code == code);
};

const storeCache = (item) => {
  let items = getAllCache() ?? [];
  items.push(item);

  localStorage.setItem(KEYNAME, JSON.stringify(items));
};

const removeCache = (code) => {
  let items = getAllCache();
  items = items.filter((item) => item.code !== code);

  localStorage.setItem(KEYNAME, JSON.stringify(items));
};

export { getAllCache, getCached, storeCache, removeCache };
