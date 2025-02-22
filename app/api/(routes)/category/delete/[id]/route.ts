import { PrismaClient } from '@prisma/client'
import {NextRequest , NextResponse} from 'next/server'

const db = new PrismaClient()

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const id = (await params).id 

    if(!id) {
      return NextResponse.json({
        success: false , 
        message: 'Category Data not found',
        statusCode: 404
      })
    } else {
      const deleteCategory = await db.categoryData.delete({
        where: {
          id: id
        }
      })
      if (deleteCategory) {
        return NextResponse.json({
          success: true , 
          message: 'Delete category successfully',
          statusCode: 200
        })
      }
    }


  } catch (error) {
    return NextResponse.json({
      success: false, 
      message: 'Internal Server Error',
      error, 
      statusCode: 500
    })
  }
}