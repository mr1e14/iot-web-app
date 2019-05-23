const oneLight = [
  {
    name: "Bedroom",
    connected: true,
    on: true,
    brightness: 100,
    effect: null,
    color: "#42f48f"
  }
];

const twoLights = [
  {
    name: "Bedroom",
    connected: true,
    on: true,
    brightness: 100,
    effect: null,
    color: "#42f48f"
  },
  {
    name: "Hall",
    connected: true,
    on: false,
    brightness: 14,
    effect: null,
    color: "#ff8026"
  }
];

const fourLights = [
  {
    name: "Bedroom",
    connected: true,
    on: true,
    brightness: 100,
    effect: null,
    color: "#42f48f"
  },
  {
    name: "Hall",
    connected: true,
    on: false,
    brightness: 100,
    effect: null,
    color: "#ff8026"
  },
  {
    name: "Lounge",
    connected: false,
    on: undefined,
    brightness: undefined,
    effect: undefined,
    color: undefined
  },
  {
    name: "Lounge",
    connected: true,
    on: true,
    brightness: 13,
    effect: null,
    color: "#5126ff"
  }
];

module.exports = { oneLight, twoLights, fourLights };
