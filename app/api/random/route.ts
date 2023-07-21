// pages/api/random.ts

import { NextResponse, NextRequest } from 'next/server'

function generateRandomAlphaNum(): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  
  // Generate 4 characters for each of the 4 groups
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Don't add a hyphen after the last group
    if (i < 3) {
      result += '-';
    }
  }

  return result;
}

export async function GET(request: Request, response: Response  ){
  const randomAlphaNum = generateRandomAlphaNum();
  return NextResponse.json({ randomAlphaNum });
}
