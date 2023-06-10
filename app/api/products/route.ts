import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import type { Product } from '@prisma/client'

const prisma = new PrismaClient()

export const POST = async (req: Request) => {
  const body: Product = await req.json()
  const product = await prisma.product.create({
    data: {
      title: body.title,
      price: body.price,
      brandId: body.brandId,
    },
  })
  return NextResponse.json(product, { status: 201 })
}
