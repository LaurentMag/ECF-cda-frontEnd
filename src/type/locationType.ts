export type locationType = {
  id: number;
  dateDebut: string;
  dateFin: string;
  prix: number;
  client: {
    id: number;
    nom: string;
    prenom: string;
    dateDeNaissance: string;
    email: string;
    telephone: string;
  };
  voiture: {
    id: number;
    marque: string;
    model: string;
    immatriculation: string;
    etat: string;
    prixJournee: number;
    disponible: boolean;
    type: string;
  };
};
