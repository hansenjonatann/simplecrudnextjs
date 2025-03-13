'use server'
import { NextResponse, NextRequest } from 'next/server'
import {PrismaClient} from '@prisma/client'
const db = new PrismaClient()

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const id = (await params).id 

    await db.data.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Success deleted data',
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