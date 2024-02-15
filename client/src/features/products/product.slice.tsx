import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestStatus } from "../../services/constants";
import { RootState } from "../../store/store";
import { getProductsService } from "./product.service";

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

const fetchProductsThunk = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkApi) => {
    const result = await getProductsService();

    if (result.status === RequestStatus.ERROR) {
      return thunkApi.rejectWithValue(result);
    }

    return result.data;
  }
);

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
      state.data = action.payload;
    },
    setStatus(state, action: PayloadAction<RequestStatus>) {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProductsThunk.pending, (state, action) => {
      state.status = RequestStatus.LOADING;
    });

    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = RequestStatus.SUCCESS;
    });

    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      state.status = RequestStatus.ERROR;
    });
  },
});

let { saveProducts, setStatus } = productSlice.actions;

const selectProducts = (state: RootState) => state.products;

export { saveProducts, setStatus, RequestStatus };
export type { ProductType, ProductSliceType };
export default productSlice.reducer;
export { fetchProductsThunk };
export { selectProducts };
