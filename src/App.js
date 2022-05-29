import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { calculateTotals } from './redux/features/cart/cartSlice'
import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'
import Modal from './components/Modal'

function App() {
	const { cartItems } = useSelector(store => store.cart)
	const { isOpen } = useSelector(store => store.modal)
	const dispatch = useDispatch()
	console.log('render')

	useEffect(() => {
		dispatch(calculateTotals())
	}, [cartItems, dispatch])

	return (
		<main>
			{isOpen && <Modal />}
			<Navbar />
			<CartContainer />
		</main>
	)
}
export default App
