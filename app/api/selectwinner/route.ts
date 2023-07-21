// pages/api/random.ts
import { NextResponse, NextRequest } from 'next/server'

export async  function POST(request: Request, response: Response ) {
  if (request.method !== 'POST') {
    return NextResponse.json({message: 'Only POST requests allowed.'});
  }

  const res = await request.json()

  
  if (!Array.isArray(res)) {
    return NextResponse.json({ message: 'Invalid request body. Expected an array.', res });
  }


  
  const randomIndex = Math.floor(Math.random() * res.length);
  const randomValue = res[randomIndex];
  
  return NextResponse.json({ randomValue });

}
