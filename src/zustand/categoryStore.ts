import { create } from "zustand";
import { toast } from "react-toastify";

import { client } from "@config/pocketbase";

import { CategoryStore } from "@models/StoreModels";
import { AddCategoryFormData } from "@models/FormDataModel";
import { Category, ServerResponse } from "@models/DataModels";
import toastOptions from "@constants/toastOptions";

const useCategoryStore = create<CategoryStore>((set) => ({
  isLoading: false,
  categories: [],
  getAllCategories: async () => {
    try {
      set({ isLoading: true });
      const categories: Category[] = await client
        .collection("categories")
        .getFullList({ requestKey: null });
      set({ categories });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    } finally {
      setTimeout(() => {
        set({ isLoading: false });
      }, 1000);
    }
  },
  addCategory: async (category: AddCategoryFormData) => {
    try {
      const savedCategory: Category = await client
        .collection("categories")
        .create(category);
      set(({ categories }) => ({ categories: [...categories, savedCategory] }));
      toast.success("Categoria agregada con exito!", toastOptions);
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
      toast.error(
        "Ha ocurrido un error al guardar la categoría!",
        toastOptions
      );
    }
  },
  removeCategory: async (id: string) => {
    try {
      await client.collection("categories").delete(id);
      set(({ categories }) => ({
        categories: categories.filter((category) => category.id !== id),
      }));
      toast.success("Categoria eliminada con exito!", toastOptions);
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
      toast.error(
        "Ha ocurrido un error al eliminar la categoría!",
        toastOptions
      );
    }
  },
  editCategory: async (id: string, modifiedCategory: AddCategoryFormData) => {
    try {
      const updatedCategory: Category = await client
        .collection("categories")
        .update(id, modifiedCategory);
      set(({ categories }) => ({
        categories: categories.map((category) => {
          if (category.id === id) return updatedCategory;
          return category;
        }),
      }));
      toast.success("Categoria editada con exito!", toastOptions);
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
      toast.error("Ha ocurrido un error al editar la categoría!", toastOptions);
    }
  },
}));

export default useCategoryStore;
