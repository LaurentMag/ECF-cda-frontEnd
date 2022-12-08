export type vehicleType = {
  id: string;
  marque: string;
  modele: string;
  immatriculation: string;
  etat: string;
  prixJournee: number;
  disponible: boolean;
  type: string;
};

export type vehicleTypeNoID = {
  marque: string;
  model: string;
  immatriculation: string;
  etat: string;
  prixJournee: number;
  disponible: boolean;
  type: string;
};
