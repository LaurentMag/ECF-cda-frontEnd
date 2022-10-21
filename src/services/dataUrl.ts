class dataURLClass {
  client = "http://localhost:3000/clients";
  vehicles = "http://localhost:3000/voitures";
  location = "http://localhost:3000/location";
}

export const dataURL = Object.freeze(new dataURLClass());
