import { Link } from 'react-router-dom'
import Img from './Img.jsx'
import QtyStepper from './QtyStepper.jsx'
import { useCart } from '../context/CartContext.jsx'
import { cartCopy } from '../data/cart.js'
import { formatPrice } from '../lib/format.js'
import './CartLine.css'

export default function CartLine({ line, onNavigate }) {
  const { updateQty, removeItem, maxQty } = useCart()
  const { product } = line
  const href = `/product/${product.id}`

  return (
    <li className="cart-line">
      <Link to={href} className="cart-line__media" tabIndex={-1} aria-hidden="true" onClick={onNavigate}>
        <Img src={product.image} alt="" ratio="4 / 5" />
      </Link>

      <div className="cart-line__body">
        <div className="cart-line__top">
          <div>
            <h3 className="cart-line__name">
              <Link to={href} onClick={onNavigate}>{product.name}</Link>
            </h3>
            {line.option && (
              <p className="cart-line__meta">
                {product.options?.label}: {line.option}
              </p>
            )}
            <p className="cart-line__meta">{formatPrice(product.price)} each</p>
          </div>
          <p className="cart-line__total">{formatPrice(line.lineTotal)}</p>
        </div>

        <div className="cart-line__actions">
          <QtyStepper
            size="sm"
            value={line.qty}
            max={maxQty}
            label={`Quantity of ${product.name}`}
            onChange={(qty) => updateQty(line.key, qty)}
          />
          <button
            type="button"
            className="cart-line__remove"
            aria-label={`${cartCopy.remove} ${product.name}`}
            onClick={() => removeItem(line.key)}
          >
            {cartCopy.remove}
          </button>
        </div>
      </div>
    </li>
  )
}
