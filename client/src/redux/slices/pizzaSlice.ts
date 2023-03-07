import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type PizzaItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
    rating: number
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: PizzaItem[],
    currentItem: Object,
    status: Status,
    totalPages: number,
}

type fetchPizzasArg = {
    checkedCurrentPage: number,
    categoryId: string,
    sortType: string,
    searchValue: string
}

export const fetchPizzas = createAsyncThunk<PizzaSliceState, fetchPizzasArg>(
    "pizza/fetchPizzasStatus",
    async ({ checkedCurrentPage, categoryId, sortType, searchValue }) => {
        const { data } = await axios.get<PizzaSliceState>(
            `${process.env.REACT_APP_BASE_URL}/client/products?page=${checkedCurrentPage}&limit=8&category=${categoryId}&sortType=${sortType}&search=${searchValue}`
        );

        return data;
    }
);

export const fetchCurrentPizza = createAsyncThunk<PizzaSliceState>(
    "pizza/fetchCurrentPizzaStatus",
    async (id) => {
        const { data } = await axios.get<PizzaSliceState>(
            `${process.env.REACT_APP_BASE_URL}/client/product/${id}`
        );

        return data;
    }
);

const initialState: PizzaSliceState = {
    items: [],
    currentItem: {},
    status: Status.LOADING,
    totalPages: 0,
};

const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.totalPages = action.payload.totalPages;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        });
        builder.addCase(fetchCurrentPizza.pending, (state) => {
            state.status = Status.LOADING;
            state.currentItem = {};
        });
        builder.addCase(fetchCurrentPizza.fulfilled, (state, action) => {
            state.currentItem = (action.payload.currentItem as Object[])[0];
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchCurrentPizza.rejected, (state) => {
            state.status = Status.ERROR;
            state.currentItem = {};
        });
    },
});

export default pizzaSlice.reducer;
