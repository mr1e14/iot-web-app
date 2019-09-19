const { MAX_ROOM_NAME_LENGTH } = require("../config");

const validateRoomName = name => {
  if (typeof name === "string") {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      return false;
    }
    return name.length > MAX_ROOM_NAME_LENGTH ? false : true;
  }
  return false;
};

const splitSecondsToParts = value => {
  const seconds = parseInt(value, 10);
  if (isNaN(seconds)) {
    return { h: 0, m: 0, s: 0 };
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return { h: h, m: m, s: s };
};

module.exports = { validateRoomName, splitSecondsToParts };
