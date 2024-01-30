import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchProductsService } from "../services/products";
import { RequestStatus } from "../../../services/constants";

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

function convertPriceToRoundvalue(products: any[]) {
  products.forEach((product: ProductType) => {
    product.price = Math.round(product.price);
  });
}

interface ProductSliceType {
  data: ProductType[];
  status: RequestStatus;
}

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [] as ProductType[],
    status: RequestStatus.LOADING,
  },
  reducers: {
    saveProducts(state, action: PayloadAction<ProductType[]>) {
      convertPriceToRoundvalue(action.payload);
      state.data = action.payload;
    },
    setStatus(state, action: PayloadAction<RequestStatus>) {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProductsService.pending, (state, action) => {
      state.status = RequestStatus.LOADING;
    });

    builder.addCase(fetchProductsService.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = RequestStatus.SUCCESS;
    });

    builder.addCase(fetchProductsService.rejected, (state, action) => {
      state.status = RequestStatus.ERROR;
    });
  },
});

let { saveProducts, setStatus } = productSlice.actions;

export { saveProducts, setStatus, RequestStatus };
export type { ProductType, ProductSliceType };
export default productSlice.reducer;
