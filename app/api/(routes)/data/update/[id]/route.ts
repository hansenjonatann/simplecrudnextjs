'use server'
import {NextResponse , NextRequest} from 'next/server'
import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{id: string}>} ) => {
  try {
    const id = (await params).id 
    if(!id) {
      return NextResponse.json({
        success: false,
        message: 'Data not found',
        statusCode: 404
      })
    }
    
    const body = await req.json()
    const generateSlug = body.name.toLowerCase().replaceAll(' ', '-')
    const updatedData = await db.data.update({
      where: {
        id: id
      }, 
      data: {
        name: body.name,
        slug: generateSlug,
        content: body.content
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Data updated!',
      data: updatedData,
      statusCode: 200
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