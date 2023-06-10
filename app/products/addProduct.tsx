'use client'
import { useState, SyntheticEvent } from 'react'
import type { Brand } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [brand, setBrand] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleSave = async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.post('/api/products', {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    })
    setTitle('')
    setPrice('')
    setBrand('')
    router.refresh()
    setIsOpen(false)
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button className="btn btn-success btn-sm" onClick={handleModal}>
          Add New
        </button>
      </div>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSave}>
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
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered"
                placeholder="product price"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select Brand
                </option>
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
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
