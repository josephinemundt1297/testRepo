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
export const newChild = (): ChildProfile => ({
  id: crypto.randomUUID(),
  name: "",
  birthday: "",
  shareBirthday: true,
});
