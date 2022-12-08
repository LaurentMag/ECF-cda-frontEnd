export type clientType = {
  id: string;
  nom: string;
  prenom: string;
  dateDeNaissance: string;
  // use local date to iso
  // date format => et donne le format que tu veux pour la deserialisation du JSON
  email: string;
  telephone: string;
};

export type clientTypeNoID = {
  nom: string;
  prenom: string;
  dateDeNaissance: string;
  email: string;
  telephone: string;
};
