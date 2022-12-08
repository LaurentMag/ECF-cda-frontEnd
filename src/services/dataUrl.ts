// class dataURLClass {
//   client = "http://localhost:3000/clients";
//   vehicles = "http://localhost:3000/voitures";
//   location = "http://localhost:3000/location";
// }

// ajout des URL pour le back JAVA
class dataURLClass {
  client = "http://localhost:8080/clients";
  vehicles = "http://localhost:8080/vehicules";
  location = "http://localhost:8080/locations";
}

export const dataURL = Object.freeze(new dataURLClass());
