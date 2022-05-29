import { useDispatch } from 'react-redux'
import {
	removeItem,
	increaseAmount,
	decreaseAmount
} from '../redux/features/cart/cartSlice'
import { ChevronDown, ChevronUp } from '../icons'

const CartItem = ({ id, img, title, price, amount }) => {
	const dispatch = useDispatch()

	const removeItemHandler = () => dispatch(removeItem(id))
	const increaseAmountHandler = () => dispatch(increaseAmount(id))
	const decreaseAmountHandler = () => {
		if (amount === 1) return removeItemHandler()

		dispatch(decreaseAmount(id))
	}

	return (
		<article className='cart-item'>
			<img src={img} alt={title} />
			<div>
				<h4>{title}</h4>
				<h4 className='item-price'>${price}</h4>
				<button className='remove-btn' onClick={removeItemHandler}>
					remove
				</button>
			</div>
			<div>
				<button className='amount-btn' onClick={increaseAmountHandler}>
					<ChevronUp />
				</button>
				<p className='amount'>{amount}</p>
				<button className='amount-btn' onClick={decreaseAmountHandler}>
					<ChevronDown />
				</button>
			</div>
		</article>
	)
}

export default CartItem
