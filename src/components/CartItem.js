import { useDispatch } from 'react-redux'
import { removeItem } from '../redux/features/cart/cartSlice'
import { ChevronDown, ChevronUp } from '../icons'

const CartItem = ({ id, img, title, price, amount }) => {
	const dispatch = useDispatch()

	const removeItemHandler = id => {
		dispatch(removeItem(id))
	}

	return (
		<article className='cart-item'>
			<img src={img} alt={title} />
			<div>
				<h4>{title}</h4>
				<h4 className='item-price'>${price}</h4>
				<button className='remove-btn' onClick={() => removeItemHandler(id)}>
					remove
				</button>
			</div>
			<div>
				<button className='amount-btn'>
					<ChevronUp />
				</button>
				<p className='amount'>{amount}</p>
				<button className='amount-btn'>
					<ChevronDown />
				</button>
			</div>
		</article>
	)
}

export default CartItem
