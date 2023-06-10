'use client'
import { useState, SyntheticEvent } from 'react'
import type { Brand } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type Product = {
  id: number
  title: string
  price: number
  brandId: number
}

const UpdateProduct = ({
  brands,
  product,
}: {
  brands: Brand[]
  product: Product
}) => {
  const [title, setTitle] = useState(product.title)
  const [price, setPrice] = useState(product.price)
  const [brand, setBrand] = useState(product.brandId)
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleEdit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.patch(`/api/products/${product.id}`, {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    })
    router.refresh()
    setIsOpen(false)
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {product.title}</h3>
          <form onSubmit={handleEdit}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                placeholder="product name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Product Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="input input-bordered"
                placeholder="product price"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <select
                value={brand}
                onChange={(e) => setBrand(Number(e.target.value))}
                className="select select-bordered"
              >
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={handleModal}>
                Close
              </button>
              <button className="btn btn-primary">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct
