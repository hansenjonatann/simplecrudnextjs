'use server'

import {NextRequest, NextResponse} from 'next/server'
import {PrismaClient} from '@prisma/client'

const db = new PrismaClient()


export const GET = async (req: NextRequest, { params }: { params: Promise<{id: string}>}) => {
  try {
    const id = (await params).id

    const data = await db.data.findFirst({
      where: {
        id: id
      }
    })

    if(data) {
      return NextResponse.json({
        success: true  , 
        message: 'Detail of Data',
        data,
        statusCode: 200
      })
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