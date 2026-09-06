import type { Dispatch, SetStateAction } from "react";

let externalAccessToken: Dispatch<SetStateAction<string | null>> | null = null;

export function registerAccessTokenSetter(
  setter: Dispatch<SetStateAction<string | null>>,
) {
  externalAccessToken = setter;
}

export function setReactAccessToken(token: string | null) {
  externalAccessToken?.(token);
}
