export const metadata = {
  name: 'ProductLayout',
}

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-20">{children}</div>
}

export default ProductLayout
