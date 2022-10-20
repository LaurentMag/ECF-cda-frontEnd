export type vehicleType = {
  id: number;
  marque: string;
  model: string;
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
