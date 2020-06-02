function getDataJson (url) {
  return fetch(url).then((res) => res.json());
};

export default { getDataJson };
