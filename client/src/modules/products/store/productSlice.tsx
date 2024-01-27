import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../services/products";

interface ProductType {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

enum STATUS {
  LOADING = "loading",
  ERROR = "error",
  SUCCESS = "Success",
}

function convertPriceToRoundvalue(products: any[]) {
  products.forEach((product: ProductType) => {
    product.price = Math.round(product.price);
  });
}

interface ProductSliceType {
  data: ProductType[];
  status: STATUS;
}

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [] as ProductType[],
    status: STATUS.LOADING,
  },
  reducers: {
    saveProducts(state, action: PayloadAction<ProductType[]>) {
      convertPriceToRoundvalue(action.payload);
      state.data = action.payload;
    },
    setStatus(state, action: PayloadAction<STATUS>) {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.status = STATUS.LOADING;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUS.SUCCESS;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = STATUS.ERROR;
    });
  },
});

let { saveProducts, setStatus } = productSlice.actions;

export { saveProducts, setStatus, STATUS };
export type { ProductType, ProductSliceType };
export default productSlice.reducer;
