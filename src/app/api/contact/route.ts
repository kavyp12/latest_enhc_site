// // D:\agency-website\src\app\api\contact\route.ts
// import { NextResponse } from 'next/server';
// import fs from 'fs/promises';
// import path from 'path';

// const filePath = path.join(process.cwd(), 'data', 'submissions.json');

// export async function POST(request: Request) {
//   try {
//     const { name, email, company, message, status, date, time } = await request.json();

//     // Validate required fields
//     if (!name || !email || !message || !status || !date || !time) {
//       return NextResponse.json(
//         { error: 'All fields (name, email, message, status, date, time) are required' },
//         { status: 400 }
//       );
//     }

//     // Read existing submissions
//     let submissions: any[] = [];
//     try {
//       const fileContent = await fs.readFile(filePath, 'utf-8');
//       submissions = JSON.parse(fileContent);
//     } catch (error) {
//       submissions = [];
//     }

//     // Create new submission
//     const newSubmission = {
//       id: submissions.length > 0 ? Math.max(...submissions.map((s) => s.id)) + 1 : 1,
//       name,
//       email,
//       company: company || '',
//       message,
//       status,
//       date,
//       time,
//     };
//     submissions.push(newSubmission);

//     // Write updated submissions
//     await fs.writeFile(filePath, JSON.stringify(submissions, null, 2));

//     return NextResponse.json(
//       { message: 'Submission saved successfully', data: newSubmission },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error saving submission:', error);
//     return NextResponse.json(
//       { error: 'Failed to save submission' },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(request: Request) {
//   try {
//     const { id, status } = await request.json();

//     if (!id || !status) {
//       return NextResponse.json(
//         { error: 'ID and status are required' },
//         { status: 400 }
//       );
//     }

//     // Read existing submissions
//     let submissions: any[] = [];
//     try {
//       const fileContent = await fs.readFile(filePath, 'utf-8');
//       submissions = JSON.parse(fileContent);
//     } catch (error) {
//       return NextResponse.json(
//         { error: 'No submissions found' },
//         { status: 404 }
//       );
//     }

//     // Update status
//     const updatedSubmissions = submissions.map((submission) =>
//       submission.id === id ? { ...submission, status } : submission
//     );

//     // Write updated submissions
//     await fs.writeFile(filePath, JSON.stringify(updatedSubmissions, null, 2));

//     return NextResponse.json(
//       { message: 'Status updated successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error updating status:', error);
//     return NextResponse.json(
//       { error: 'Failed to update status' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: Request) {
//   try {
//     const { id } = await request.json();

//     if (!id) {
//       return NextResponse.json(
//         { error: 'ID is required' },
//         { status: 400 }
//       );
//     }

//     // Read existing submissions
//     let submissions: any[] = [];
//     try {
//       const fileContent = await fs.readFile(filePath, 'utf-8');
//       submissions = JSON.parse(fileContent);
//     } catch (error) {
//       return NextResponse.json(
//         { error: 'No submissions found' },
//         { status: 404 }
//       );
//     }

//     // Filter out the submission to delete
//     const updatedSubmissions = submissions.filter((submission) => submission.id !== id);

//     // Write updated submissions
//     await fs.writeFile(filePath, JSON.stringify(updatedSubmissions, null, 2));

//     return NextResponse.json(
//       { message: 'Submission deleted successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error deleting submission:', error);
//     return NextResponse.json(
//       { error: 'Failed to delete submission' },
//       { status: 500 }
//     );
//   }
// }


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
      console.error('Supabase error:', error);
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
      console.error('Supabase error:', error);
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
      console.error('Supabase error:', error);
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