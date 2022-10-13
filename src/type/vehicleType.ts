export type vehicleType = {
  id: number;
  marque: string;
  immatriculation: string;
  etat: string;
  prixJournee: number;
  disponible: boolean;
  type: string;
};

export type vehicleTypeNoID = {
  marque: string;
  immatriculation: string;
  etat: string;
  prixJournee: number;
  disponible: boolean;
  type: string;
};
