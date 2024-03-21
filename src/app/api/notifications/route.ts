import { NotificationInsert } from "@/lib/supabase";
import { NextResponse } from 'next/server';
import supabaseServer from '@/lib/supabase-server';

// @TODO: This is not secure -- try to get the user's session from the request
// and use that to authenticate the request

export async function GET() {
  const { data, error } = await supabaseServer
    .from('notifications')
    .select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: Request) {
  const { data, error } = await supabaseServer
    .from('notifications')
    .insert(request.body as NotificationInsert)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}