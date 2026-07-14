// Kleine Datentypen zuerst: So sieht man direkt, was zum Kind und was zur Familie gehört.
export type ChildProfile = {
  id: string;
  name: string;
  birthday: string;
  shareBirthday: boolean;
};
export type FamilyProfile = { familyName: string; children: ChildProfile[] };
export type SharedBirthday = {
  id: string;
  childName: string;
  familyName: string;
  birthday: string;
};
export const emptyFamilyProfile: FamilyProfile = {
  familyName: "",
  children: [],
};
// Für eine neue Formularzeile brauchen wir ein leeres Kind mit einer eindeutigen ID.
export const newChild = (): ChildProfile => ({
  id: crypto.randomUUID(),
  name: "",
  birthday: "",
  shareBirthday: true,
});
