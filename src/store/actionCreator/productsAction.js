import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, EDIT_PRODUCT_SAVE } from "../actionType";

export const deleteProductsAction = (id) => ({
  type: DELETE_PRODUCT,
  payload: { id },
});

export const editProductsAction = (id) => ({
  type: EDIT_PRODUCT,
  payload: { id },
});

export const editProductSaveAction = (data) => ({
  type: EDIT_PRODUCT_SAVE,
  payload: data,
});

export const addProductAction = (data) => ({
  type: ADD_PRODUCT,
  payload: data,
});
