import { useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'

import { notifyError, notifySuccess } from '@utils/toast'

const useAddToCart = () => {
  const [item, setItem] = useState(1)
  const [products, setProducts] = useState([])
  const { addItem, items, updateItemQuantity } = useCart()

  useEffect(() => {
    const products = sessionStorage.getItem('products')
    setProducts(JSON.parse(products))
  }, [])

  const handleAddItem = (product) => {
    const result = items.find((i) => i.id === product.id)

    if (result !== undefined) {
      if (result?.minimum_quantity < product?.minimum_quantity) {
        const newItem = {
          ...product,
          id: product.id,
        }
        addItem(newItem, item)
        notifySuccess(`${item} ${product.brand_name} added to cart!`)
      } else {
        notifyError('No more quantity available for this product!')
      }
    } else {
      const newItem = {
        ...product,
        id: product.id,
      }

      addItem(newItem, item)
      notifySuccess(`${item} ${product.brand_name} added to cart!`)
    }
  }

  const handleIncreaseQuantity = (item) => {
    const result = products?.find((p) => p.id === item.id)
    if (result) {
      if (item?.minimum_quantity < result?.minimum_quantity) {
        updateItemQuantity(item.id, item.minimum_quantity + 1)
      } else {
        notifyError('No more quantity available for this product!')
      }
    }
  }

  return {
    handleAddItem,
    setItem,
    item,
    handleIncreaseQuantity,
  }
}

export default useAddToCart
