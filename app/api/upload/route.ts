import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('image') as File;

  if (!file) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });
  }

  try {
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true }); 
    
    const filePath = path.join(uploadsDir, file.name);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, new Uint8Array(fileBuffer));

    const fileUrl = `/uploads/${file.name}`; 
    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar o arquivo:', error);
    return NextResponse.json({ error: 'Erro ao processar o upload' }, { status: 500 });
  }
}
