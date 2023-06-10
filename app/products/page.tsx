import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import AddProduct from './addProduct'
import DeleteProduct from './deleteProduct'
import UpdateProduct from './updateProduct'

const getProducts = async () => {
  const response = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      brandId: true,
      brand: true,
    },
  })
  return response
}

const getBrands = async () => {
  const response = await prisma.brand.findMany()
  return response
}

const Product = async () => {
  const [products, brands] = await Promise.all([getProducts(), getBrands()])

  return (
    <div>
      <div className="mb-2">
        <AddProduct brands={brands} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th className="text-center w-1/6">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.brand.name}</td>
              <td>
                <div className="flex justify-center gap-2">
                  <UpdateProduct product={product} brands={brands} />
                  <DeleteProduct product={product} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Product
