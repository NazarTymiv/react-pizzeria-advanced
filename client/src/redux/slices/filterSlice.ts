import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Sort = "rating" | "-rating" | "price" | "-price" | "title" | "-title"

export interface FilterSliceState {
    categoryId?: number,
    sortType?: Sort,
    currentPage?: number,
    searchValue?: string,
}

const initialState: FilterSliceState = {
    categoryId: 0,
    sortType: "rating",
    currentPage: 1,
    searchValue: "",
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSortId(state, action: PayloadAction<Sort>) {
            state.sortType = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.sortType = action.payload.sortType;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        },
    },
});

export const {
    setCategoryId,
    setSortId,
    setCurrentPage,
    setFilters,
    setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
