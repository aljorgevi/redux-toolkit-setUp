import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
	cartItems: [],
	amount: 2,
	total: 0,
	isLoading: true
}

const url = 'https://course-api.com/react-useReducer-cart-project'

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
	try {
		const res = await fetch(url)
		return await res.json()
	} catch (err) {
		return console.log(err)
	}
})

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearCart: state => {
			state.cartItems = []
		},
		removeItem: (state, action) => {
			const id = action.payload
			state.cartItems = state.cartItems.filter(item => item.id !== id)
		},
		increaseAmount: (state, action) => {
			const id = action.payload
			const item = state.cartItems.find(item => item.id === id)
			item.amount++
		},
		decreaseAmount: (state, action) => {
			const id = action.payload
			const item = state.cartItems.find(item => item.id === id)
			item.amount--
		},
		calculateTotals: state => {
			state.total = state.cartItems.reduce(
				(acc, el) => acc + el.amount * el.price,
				0
			)
			state.amount = state.cartItems.reduce((acc, el) => acc + el.amount, 0)
		},
		extraReducers: {
			[getCartItems.pending]: state => {
				state.isLoading = true
			},
			[getCartItems.fulfilled]: (state, action) => {
				console.log(action)
				state.isLoading = false
				state.cartItems = action.payload
			},
			[getCartItems.rejected]: (state, action) => {
				console.log(action)
				state.isLoading = false
			}
		}
	}
})

// console.log(cartSlice)

export const {
	clearCart,
	removeItem,
	increaseAmount,
	decreaseAmount,
	calculateTotals
} = cartSlice.actions

export default cartSlice.reducer
