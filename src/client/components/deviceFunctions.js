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

module.exports = { validateRoomName };
