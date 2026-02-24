import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const requestUrl = new URL(request.url)
        const formData = await request.formData()
        const email = String(formData.get('email'))
        const password = String(formData.get('password'))
        const fullName = String(formData.get('fullName') || '')

        const supabase = await createClient()

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${requestUrl.origin}/auth/callback`,
                data: {
                    full_name: fullName,
                }
            },
        })

        if (error) {
            return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`, {
                status: 301,
            })
        }

        // Since we likely don't have email verification turned on for this MVP,
        // they are automatically signed in, redirect them to dashboard
        return NextResponse.redirect(`${requestUrl.origin}/dashboard?message=${encodeURIComponent('Check email to continue sign in process (if verification enabled) or you are signed in.')}`, {
            status: 301,
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.redirect(`${new URL(request.url).origin}/login?error=${encodeURIComponent(message)}`, {
            status: 301,
        })
    }
}
