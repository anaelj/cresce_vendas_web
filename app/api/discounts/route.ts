export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import { Discount } from '@/app/types/discount';

let discounts: Discount[] = [];

export async function GET() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
   
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  
  const data = await request.json();
  const newDiscount = {
    ...data,
    id: Date.now().toString(),
    order: discounts.length + 1
  };
  
  discounts.push(newDiscount);
  return NextResponse.json(newDiscount);
}

export async function PUT(request: Request) {
  const data = await request.json();
  const index = discounts.findIndex((d : any) => d?.id === data.id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Discount not found' }, { status: 404 });
  }
  
  discounts[index] = { ...discounts[index], ...data };
  return NextResponse.json(discounts[index]);
}