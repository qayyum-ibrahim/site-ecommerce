import { Link } from 'react-router-dom'
import Img from './Img.jsx'
import { getCategory } from '../data/products.js'
import { formatPrice } from '../lib/format.js'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const category = getCategory(product.category)
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__media">
          <Img src={product.image} alt={product.name} label={product.name} />
          {product.badge && <span className="product-card__badge">{product.badge}</span>}
        </div>
        <div className="product-card__body">
          <p className="product-card__cat">{category?.label}</p>
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  )
}
