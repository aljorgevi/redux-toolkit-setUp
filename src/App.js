import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { calculateTotals, getCartItems } from './redux/features/cart/cartSlice'
import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'
import Modal from './components/Modal'

function App() {
	const { cartItems, isLoading } = useSelector(store => store.cart)
	const { isOpen } = useSelector(store => store.modal)
	const dispatch = useDispatch()
	console.log('render')

	useEffect(() => {
		dispatch(calculateTotals())
	}, [cartItems, dispatch])

	useEffect(() => {
		dispatch(getCartItems())
	}, [dispatch])

	if (isLoading) {
		return (
			<div className='loading'>
				<h1>Loading....</h1>
			</div>
		)
	}

	return (
		<main>
			{isOpen && <Modal />}
			<Navbar />
			<CartContainer />
		</main>
	)
}
export default App
