import {PrismaClient} from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()


export const GET = async () => {
  try {
    const datas = await db.data.findMany({
      include: {
        category: true
      }
    })

    return NextResponse.json({
      success: true, 
      message: 'List of Data', 
      data: datas, 
      statusCode: 200
    })
  } catch (error) {
    return NextResponse.json({
      success: false, 
      message: 'Internal Server Error',
      error , 
      statusCode: 500
    })
  }
}


export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    const generateSlug = body.name.toLowerCase().replaceAll(' ', '-')
    const newData = await db.data.create({
      data: {
        categoryId: body.categoryId, 
        name: body.name,
        slug: generateSlug, 
        content: body.content
      }
    })

    return NextResponse.json({
      success: true , 
      message: 'Success create a new Data', 
      data: newData, 
      statusCode: 201
    })
  } catch (error) {
    return NextResponse.json({
      success: false, 
      message: 'Internal Server Error',
      error, 
      statusCode: 500
    })
  }
}