import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { openModal } from '../modal/modalSlice'

const initialState = {
	cartItems: [],
	amount: 2,
	total: 0,
	isLoading: true
}

const url = 'https://course-api.com/react-useReducer-cart-project'

export const getCartItems = createAsyncThunk(
	'cart/getCartItems',
	async (props, thunkAPI) => {
		try {
			console.log(props)
			// console.log({ props, thunkAPI })
			// console.log(thunkAPI.getState())
			// thunkAPI.dispatch(openModal())
			const result = await axios.get(url)
			return result.data
		} catch (error) {
			return thunkAPI.rejectWithValue('Something went wrong')
		}
	}
)

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
		}
	},
	extraReducers: {
		[getCartItems.pending]: state => {
			state.isLoading = true
		},
		[getCartItems.fulfilled]: (state, action) => {
			state.isLoading = false
			state.cartItems = action.payload
		},
		[getCartItems.rejected]: (state, action) => {
			console.log(action)
			state.isLoading = false
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
