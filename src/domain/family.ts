// Kleine Datentypen zuerst: So sieht man direkt, was zum Kind und was zur Familie gehört.
export type childProfile = {
  id: string;
  name: string;
  birthday: string;
  shareBirthday: boolean;
};
export type familyProfile = {
  familyName: string;
  children: childProfile[];
  caregivers?: string[];
};
export type sharedBirthday = {
  id: string;
  childName: string;
  familyName: string;
  birthday: string;
};
export type connectionStatus = "Ausstehend" | "Verbunden" | "Blockiert";
export type connectionChild = {
  name: string;
  birthday: string;
};
export type familyConnection = {
  id: string;
  familyName: string;
  children: connectionChild[];
  status: connectionStatus;
  invitationCode?: string;
};
export type familyInvitation = {
  token: string;
  familyName: string;
  children: connectionChild[];
  createdBy: string;
  createdAt: string;
  expiresAt: string;
  redeemed: boolean;
};
export const emptyFamilyProfile: familyProfile = {
  familyName: "",
  children: [],
  caregivers: [],
};
// Für eine neue Formularzeile brauchen wir ein leeres Kind mit einer eindeutigen ID.
export const newChild = (): childProfile => ({
  id: crypto.randomUUID(),
  name: "",
  birthday: "",
  shareBirthday: true,
});

export function birthdaysFromConnections(
  connections: familyConnection[],
): sharedBirthday[] {
  return connections
    .filter((connection) => connection.status === "Verbunden")
    .flatMap((connection) =>
      connection.children
        .filter((child) => child.birthday)
        .map((child, index) => ({
          id: `${connection.id}-${index}`,
          childName: child.name,
          familyName: connection.familyName,
          birthday: child.birthday,
        })),
    );
}

export function createFamilyInvitation(
  profile: familyProfile,
  createdBy: string,
  now = new Date(),
): familyInvitation {
  const compactId = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return {
    token: `PD-${compactId.slice(0, 4)}-${compactId.slice(4)}`,
    familyName: profile.familyName,
    children: profile.children.map((child) => ({
      name: child.name,
      // In der Verbindung teilen wir nur einen ausdrücklich freigegebenen Geburtstag.
      birthday: child.shareBirthday ? child.birthday.slice(5) : "",
    })),
    createdBy,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    redeemed: false,
  };
}

export function invitationError(
  invitation: familyInvitation | undefined,
  now = new Date(),
) {
  if (!invitation) return "Der Trainingscode wurde nicht gefunden.";
  if (invitation.redeemed) return "Der Trainingscode wurde bereits verwendet.";
  if (new Date(invitation.expiresAt) <= now) return "Der Trainingscode ist abgelaufen.";
  return "";
}
