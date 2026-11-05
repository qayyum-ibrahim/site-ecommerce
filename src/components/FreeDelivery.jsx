import { delivery } from '../data/cart.js'
import { formatPrice } from '../lib/format.js'
import './FreeDelivery.css'

export default function FreeDelivery({ subtotal }) {
  const progress = Math.min(1, subtotal / delivery.freeOver)
  const reached = progress >= 1
  return (
    <div className={`free-delivery${reached ? ' is-reached' : ''}`}>
      <p>{reached ? delivery.freeReached : delivery.freeProgress(formatPrice(delivery.freeOver - subtotal))}</p>
      <div className="free-delivery__bar" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  )
}
