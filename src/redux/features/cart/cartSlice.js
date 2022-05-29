import { createSlice } from '@reduxjs/toolkit'
import cartItems from '../../../cartItems'

const initialState = {
	cartItems: cartItems,
	amount: 2,
	total: 0,
	isLoading: true
}

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
