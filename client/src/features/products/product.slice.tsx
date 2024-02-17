import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RequestStatus, axiosBaseQuery } from "../../services/constants";
import { RootState } from "../../store";
import { getProductService, getProductsService } from "./product.service";
import { wait } from "../../utils/wait";

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

    await wait(2000);

    if (result.status === RequestStatus.ERROR) {
      return thunkApi.rejectWithValue(result.error);
    }

    return result.data;
  }
);

const fetchProductThunk = createAsyncThunk(
  "products/fetchProduct",
  async ({ id }: { id: string }, thunkApi) => {
    const result = await getProductService(id);

    await wait(2000);

    if (result.status === RequestStatus.ERROR) {
      return thunkApi.rejectWithValue(result);
    }

    return result.data;
  }
);

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["products"],
  endpoints: builder => ({
    getProducts: builder.query<ProductType[], void>({
      query: () => ({
        service: getProductsService,
      }),
      keepUnusedDataFor: 0,
    }),

    getProduct: builder.query<ProductType, string>({
      query: (id: string) => ({
        service: () => getProductService(id),
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;

interface ProductSliceType {
  data: ProductType[];
  products: {};
  status: RequestStatus;
  refetch: boolean;
}

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [] as ProductType[],
    status: RequestStatus.LOADING,
    refetch: true,
    products: {},
  },
  reducers: {
    saveProducts(state, action: PayloadAction<ProductType[]>) {
      state.data = action.payload;
    },
    setStatus(state, action: PayloadAction<RequestStatus>) {
      state.status = action.payload;
    },
    setRefetch(state, action) {
      state.refetch = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProductsThunk.pending, (state, action) => {
      state.status = RequestStatus.LOADING;
    });

    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = RequestStatus.SUCCESS;
      state.refetch = false;
    });

    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      state.status = RequestStatus.ERROR;
    });

    builder.addCase(fetchProductThunk.pending, (state, action) => {
      state.status = RequestStatus.LOADING;
    });

    builder.addCase(fetchProductThunk.rejected, (state, action) => {
      state.status = RequestStatus.ERROR;
    });

    builder.addCase(fetchProductThunk.fulfilled, (state, action) => {
      // const product = state.data.find(
      //   product => product._id === action.payload._id
      // );

      // console.log(product);

      // if (!product) {
      //   state.data.push(action.payload);
      // }

      let id = action.payload._id as string;
      let products: any = {};
      products[id] = action.payload;

      state.products = {
        ...state.products,
        ...products,
      };

      state.status = RequestStatus.SUCCESS;
    });
  },
});

let { saveProducts, setStatus, setRefetch } = productSlice.actions;

const selectProducts = (state: RootState) => state.products;

export { saveProducts, setStatus, RequestStatus };
export type { ProductType, ProductSliceType };
export default productSlice.reducer;
export { fetchProductsThunk, fetchProductThunk };
export { selectProducts, productsApi };
