export type clientType = {
  id: number;
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

export class ClientModel {
  private id: number = 0;
  private nom: string;
  private prenom: string;
  private dateDeNaissance: string;
  private email: string;
  private telephone: string;

  constructor(nom: string, prenom: string, dateDeNaissance: string, email: string, telephone: string) {
    this.nom = nom;
    this.prenom = prenom;
    this.dateDeNaissance = dateDeNaissance;
    this.email = email;
    this.telephone = telephone;
  }

  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }
}

export class ClientNoIdModel {
  private prenom: string;
  private dateDeNaissance: string;
  private email: string;
  private telephone: string;

  constructor(prenom: string, dateDeNaissance: string, email: string, telephone: string) {
    this.prenom = prenom;
    this.dateDeNaissance = dateDeNaissance;
    this.email = email;
    this.telephone = telephone;
  }
}
