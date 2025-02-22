import {PrismaClient} from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()

export const PATCH = async (req: NextRequest , {params} : {params : Promise<{id: string}>}) => {
  try {
    const id = (await params).id 

    if(!id) {
      return NextResponse.json({
        success: false , 
        message: 'Category Data not found',
        statusCode: 404
      })
    } else {
      const body = await req.json()
      const updateCategory = await db.categoryData.update({
        data: {
          name: body.name , 
          slug: body.name.toLowerCase()
        },
        where: {
          id: id
        }
        
      }
      )

      return NextResponse.json({
        success: true , 
        message: 'Sucess update current category data',
        data: updateCategory, 
        statusCode: 200
      })
    }


  } catch (error) {
    return NextResponse.json({
      success: false , 
      message: 'Internal Server Error',
      error,
      statusCode: 500
    })
  }
}