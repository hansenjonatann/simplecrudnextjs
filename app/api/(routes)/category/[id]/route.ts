import {PrismaClient} from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()

export const GET = async (req: NextRequest , {params} : {params: Promise<{id: string}>}) => {
  try {
    const id = (await params).id 

    const detailCategory = await db.categoryData.findFirst({
      where: {
        id: id
      }
    })

    return NextResponse.json({
      success: true , 
      message: "Detail of Category Data",
      data: detailCategory,
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