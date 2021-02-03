import { enableStaticRendering } from "mobx-react";
import AuthStore from "./authStore";
var isServer: boolean = typeof window === "undefined";
const stores = {};

enableStaticRendering(isServer);
const newStores = {
  AuthStore,
};

export function initializeStores(mobxStores = null) {
  Object.keys(stores).map((key) => {
    if (isServer) {
      newStores[key] = new stores[key](
        isServer,
        mobxStores ? mobxStores[key] : null
      );
    } else if (typeof newStores[key] === "undefined") {
      newStores[key] = new stores[key](
        isServer,
        mobxStores ? mobxStores[key] : null
      );
    }
  });
  return newStores;
}
