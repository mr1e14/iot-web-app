conn = new Mongo();
db = conn.getDB("iot_db");

db.createCollection("config");

db.config.insertMany([
  {
    _id: "supportedEffects",
    values: ["Disco", "Loop", "Police", "Strobe", "LSD", "Fade"]
  },
  {
    _id: "supportedColors",
    values: [
      "#ff0000",
      "#ff0032",
      "#eb3434",
      "#eb3449",
      "#eb3468",
      "#eb3483",
      "#eb348c",
      "#eb34a2",
      "#eb34b4",
      "#eb34d0",
      "#e534eb",
      "#d334eb",
      "#c634eb",
      "#b434eb",
      "#ae34eb",
      "#a234eb",
      "#9934eb",
      "#8334eb",
      "#6b34eb",
      "#5c34eb",
      "#5634eb",
      "#4034eb",
      "#3437eb",
      "#3456eb",
      "#345ceb",
      "#346eeb",
      "#3474eb",
      "#3486eb",
      "#349feb",
      "#34b1eb",
      "#34b7eb",
      "#34c9eb",
      "#34d3eb",
      "#34e8eb",
      "#34ebd9",
      "#34ebc3",
      "#34ebb1",
      "#34eba8",
      "#34eb8c",
      "#34eb80",
      "#34eb5f",
      "#37eb34",
      "#4ceb34",
      "#6eeb34",
      "#a2eb34",
      "#b7eb34",
      "#c0eb34",
      "#cdeb34",
      "#dfeb34",
      "#ebe834",
      "#ebd934",
      "#ebd334",
      "#ebb734",
      "#eba534",
      "#eb9634",
      "#eb8334",
      "#eb7734",
      "#eb6534",
      "#eb5f34",
      "#eb5334"
    ]
  },
  {
    _id: "effectsConfiguration",
    values: [
      {
        name: "general",
        configOptions: [
          {
            name: "duration",
            description: "Duration",
            stateKey: "generalDuration",
            component: "slider",
            props: {
              min: 60,
              max: 21600,
              step: 60
            }
          },
          {
            name: "transitionSpeed",
            description: "Transition speed",
            stateKey: "generalTransitionSpeed",
            component: "slider",
            props: {
              min: 5,
              max: 30
            }
          }
        ]
      },
      {
        name: "loop",
        configOptions: [
          {
            name: "numOfColors",
            description: "Number of colors",
            stateKey: "loopNumOfColors",
            component: "input",
            props: {
              type: "number",
              label: "Number",
              inputProps: {
                min: "5",
                max: "25"
              }
            }
          }
        ]
      },
      {
        name: "strobe",
        configOptions: [
          {
            name: "duration",
            description: "Duration",
            stateKey: "strobeDuration",
            component: "slider",
            props: {
              min: 1,
              max: 10
            }
          }
        ]
      },
      {
        name: "fade",
        configOptions: [
          {
            name: "turnOff",
            description: "Turn off on complete",
            stateKey: "fadeTurnOff",
            component: "checkbox",
            props: {}
          }
        ]
      }
    ]
  }
]);

db.createCollection("light_settings");
db.light_settings.insertMany([
  {
    _id: "a8990fc7-2840-4a46-b957-f59bbc2cb1bd",
    generalDuration: 60,
    generalTransitionSpeed: 30,
    loopNumOfColors: 20,
    strobeDuration: 5,
    fadeTurnOff: true
  },
  {
    _id: "6b4cce8a-d54d-4b4a-bd3f-8c6f3cd6328c",
    generalDuration: 180,
    generalTransitionSpeed: 30,
    loopNumOfColors: 10,
    strobeDuration: 7,
    fadeTurnOff: true
  },
  {
    _id: "d2c06d64-a001-43e5-bc72-a3b40d3a6ebd",
    generalDuration: 60,
    generalTransitionSpeed: 30,
    loopNumOfColors: 10,
    strobeDuration: 1,
    fadeTurnOff: true
  },
  {
    _id: "a59e2a2e-606b-486e-a40c-28860ae19299",
    generalDuration: 120,
    generalTransitionSpeed: 25,
    loopNumOfColors: 10,
    strobeDuration: 5,
    fadeTurnOff: false
  }
]);

db.createCollection("lights_data");
db.lights_data.insertMany([
  {
    _id: "a8990fc7-2840-4a46-b957-f59bbc2cb1bd",
    name: "Bedroom",
    connected: true,
    on: true,
    brightness: 94,
    effect: null,
    color: "#42f48f"
  },
  {
    _id: "6b4cce8a-d54d-4b4a-bd3f-8c6f3cd6328c",
    name: "Hallway",
    connected: true,
    on: false,
    brightness: 14,
    effect: null,
    color: "#ff8026"
  },
  {
    _id: "d2c06d64-a001-43e5-bc72-a3b40d3a6ebd",
    name: "Lounge",
    connected: false,
    on: undefined,
    brightness: undefined,
    effect: undefined,
    color: undefined
  },
  {
    _id: "a59e2a2e-606b-486e-a40c-28860ae19299",
    name: "Stairs",
    connected: true,
    on: true,
    brightness: 25,
    effect: null,
    color: "#5126ff"
  }
]);
