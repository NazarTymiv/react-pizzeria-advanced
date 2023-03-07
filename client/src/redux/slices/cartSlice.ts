import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

export type CartItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    type: string,
    size: number,
    count: number
}

interface CartSliceState {
    totalPrice: number,
    items: CartItem[]
}

const initialState: CartSliceState = {
    items: [],
    totalPrice: 0,
};

// FUNCTIONS
const getFindItem = (items: CartItem[], { id, type, size }: { id: string, type: string, size: number }) =>
    items.find((i) => i.id === id && i.type === type && i.size === size);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = getFindItem(state.items, action.payload);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<CartItem>) {
            const findItem = getFindItem(state.items, action.payload);

            if (findItem) {
                findItem.count--;
            }

            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItem(state, action: PayloadAction<CartItem>) {
            const findItem = getFindItem(state.items, action.payload);

            state.items = state.items.filter((item) => item !== findItem);

            state.totalPrice = calcTotalPrice(state.items)
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
