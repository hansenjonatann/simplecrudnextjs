import {PrismaClient} from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const db = new PrismaClient()

export const GET = async () => {
    try{
        const categories = await db.categoryData.findMany()

        return NextResponse.json({
            success: true,
            message: 'List of Category',
            data: categories,
            statusCode: 200
        })
    }catch(error) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            err: error,
            statusCode: 500
        })
    }
}

export const POST = async (req: NextRequest) => {
    try{
        const body = await req.json()

        const generateSlug = body.name.toLowerCase()
        const newCategory = await db.categoryData.create({
            data: {
                name: body.name,
                slug: generateSlug
                
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Category created!',
            data: newCategory,
            statusCode: 201
        })
    } catch(error) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error',
            err: error,
            statusCode: 500
        })
    }
}