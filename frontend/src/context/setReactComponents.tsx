import { externalAccessToken } from "./AuthProvider";

export function setReactAccessToken(token: string | null) {
  externalAccessToken?.(token);
}
