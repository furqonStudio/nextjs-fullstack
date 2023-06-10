'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type Product = {
  id: number
  title: string
  price: number
  brandId: number
}

const DeleteProduct = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleDelete = async (productId: number) => {
    await axios.delete(`/api/products/${productId}`)
    router.refresh()
    setIsOpen(false)
  }

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleModal}>
        Delete
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are You Sure to Delete {product.title}?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => handleDelete(product.id)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteProduct
