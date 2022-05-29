import { useDispatch } from 'react-redux'
import { closeModal } from '../redux/features/modal/modalSlice'
import { clearCart } from '../redux/features/cart/cartSlice'

const Modal = () => {
	const dispatch = useDispatch()

	const confirmHandler = () => {
		dispatch(clearCart())
		dispatch(closeModal())
	}

	const cancelHandler = () => dispatch(closeModal())

	return (
		<aside className='modal-container'>
			<div className='modal'>
				<h4>remove all items from your shopping cart</h4>
				<div className='btn-container'>
					<button className='btn confirm-btn' onClick={confirmHandler}>
						Confirm
					</button>
					<button className='btn clear-btn' onClick={cancelHandler}>
						Cancel
					</button>
				</div>
			</div>
		</aside>
	)
}

export default Modal
