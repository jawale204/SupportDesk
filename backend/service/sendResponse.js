exports.sendResponse = (res, success, err, data, message) => {
  return res.json({ success, err, data, message });
};
