import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const requestUrl = new URL(request.url)
        const formData = await request.formData()
        const email = String(formData.get('email'))
        const password = String(formData.get('password'))

        const supabase = await createClient()

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`, {
                status: 301,
            })
        }

        return NextResponse.redirect(`${requestUrl.origin}/dashboard`, {
            status: 301,
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.redirect(`${new URL(request.url).origin}/login?error=${encodeURIComponent(message)}`, {
            status: 301,
        })
    }
}
