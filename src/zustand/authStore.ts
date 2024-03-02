import { create } from "zustand";
import { toast } from "react-toastify";

import { client } from "@config/pocketbase";

import { AuthStore } from "@models/StoreModels";
import { LoginFormData } from "@models/FormDataModel";
import { Auth, ServerResponse } from "@models/DataModels";

const useAuthStore = create<AuthStore>((set) => ({
  authData: {
    token: client.authStore.token,
    record: {
      username: "",
      email: "",
    },
  },
  isValid: false,
  isLoading: false,
  login: async (userCredentials: LoginFormData) => {
    set({ isLoading: true });
    try {
      const authData: Auth = await client
        .collection("users")
        .authWithPassword(userCredentials.username, userCredentials.password);
      set({ authData });
      set({ isValid: client.authStore.isValid });
      toast.success("Inicio de sesión correcto!");
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
      toast.error("Credenciales erroneas, por favor verifique!");
    } finally {
      set({ isLoading: false });
    }
  },
  refreshUserAuth: async () => {
    set({ isLoading: true });
    try {
      const authData: Auth = await client
        .collection("users")
        .authRefresh({ requestKey: null });
      set({ authData });
      set({ isValid: client.authStore.isValid });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
      toast.error("Usuario no autenticado!");
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    client.authStore.clear();
    set({
      authData: {
        token: client.authStore.token,
        record: {
          username: "",
          email: "",
        },
      },
      isValid: false,
    });
  },
}));

export default useAuthStore;
