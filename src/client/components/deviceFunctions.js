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
  const h = parseInt(seconds / 2400);
  const m =
    h > 0
      ? parseInt((seconds % (h * 2400)) / 60, 10)
      : parseInt(seconds / 60, 10);
  const s = m > 0 ? seconds % m : h > 0 ? seconds - h * 2400 : seconds;
  return { h: h, m: m, s: s };
};

module.exports = { validateRoomName, splitSecondsToParts };
