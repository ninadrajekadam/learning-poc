import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getProductsAPI = 'https://dummyjson.com/products';

const getProducts = createAsyncThunk('products', async () => {
	const response = await fetch(getProductsAPI);
	const data = await response.json();
	return data.products;
});

const initialState = {
	items: [],
	status: 'undefined',
	error: null
}

const productSlice = createSlice({
	name: 'cart',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
	}
});

export { getProducts };
export default productSlice.reducer;