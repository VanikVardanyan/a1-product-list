import { DELETE_PRODUCT, EDIT_PRODUCT, EDIT_PRODUCT_SAVE, ADD_PRODUCT } from "../actionType";
import { nanoid } from "nanoid";

const initialState = {
  products: [
    {
      name: "sneakers",
      quantity: 1,
      sale: 2000,
      id: nanoid(),
      isEdit: false,
    },
    {
      name: "pants",
      quantity: 1,
      sale: 3000,
      id: nanoid(),
      isEdit: false,
    },
    {
      name: "cap",
      quantity: 1,
      sale: 6000,
      id: nanoid(),
      isEdit: false,
    },
  ],
};

export const productReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      const newProducts = state.products.filter((elem) => elem.id !== action.payload.id);
      return { ...state, products: newProducts };
    }
    case EDIT_PRODUCT: {
      const { id } = action.payload;
      const newProducts = state.products.map((elem) =>
        elem.id === id ? { ...elem, isEdit: true } : { ...elem, isEdit: false },
      );

      return { ...state, products: newProducts };
    }
    case EDIT_PRODUCT_SAVE: {
      const { id } = action.payload;
      const editProduct = state.products.map((elem) =>
        elem.id === id ? { ...elem, ...action.payload, isEdit: false } : { ...elem },
      );

      return { ...state, products: editProduct };
    }
    case ADD_PRODUCT: {
      const newProducts = {
        ...action.payload,
        id: nanoid(),
        isEdit: false,
        quantity: action.payload.quantity || "0",
      };
      return { ...state, products: [...state.products, newProducts] };
    }
    default:
      return state;
  }
};
