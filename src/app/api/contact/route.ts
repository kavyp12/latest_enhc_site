// D:\agency-website\src\app\api\contact\route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { name, email, company, message, status, date, time } = await request.json();

    if (!name || !email || !message || !status || !date || !time) {
      return NextResponse.json(
        { error: 'All fields (name, email, message, status, date, time) are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('ContactSubmission')
      .insert([
        {
          name,
          email,
          company: company || null,
          message,
          status,
          date,
          time,
        },
      ])
      .select()
      .single();

    if (error) {
      // CHANGED: Switched to JSON.stringify for more detailed error logging.
      // This will give you a full error object instead of just '{ )'.
      console.error('Supabase error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Failed to save submission' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Submission saved successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('ContactSubmission')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      // CHANGED: Switched to JSON.stringify for more detailed error logging.
      console.error('Supabase error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Failed to update status' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Status updated successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('ContactSubmission')
      .delete()
      .eq('id', id);

    if (error) {
      // CHANGED: Switched to JSON.stringify for more detailed error logging.
      console.error('Supabase error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Failed to delete submission' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Submission deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
}
