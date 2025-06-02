// D:\agency-website\src\app\api\submissions\route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'submissions.json');
    let submissions = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      submissions = JSON.parse(fileContent);
    } catch (error) {
      submissions = [];
    }
    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}