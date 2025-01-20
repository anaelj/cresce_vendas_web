'use client';

import { ChevronRight,  } from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
  

  return (
    <div className="flex w-full h-auto md:h-screen md:w-64 bg-background_sidebar">
      <div className="flex flex-col h-full items-center w-full" >
        <div className="mb-8 justify-center flex flex-col items-center mt-16">
          <img src='/assets/VALE-VANTAGENS.png' alt='VALE VANTAGENS' />
        </div>
        
        <nav className="bg-background_sidebar">
          <Link
            href="/discounts"
            className={
              "flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 bg-background_sidebar"}
          >
            <img src="/assets/money-bill-transfer-duotone.png" alt="lista de descontos" />
            <span className="text-white">Lista de descontos</span>
            <ChevronRight className="text-white w-6 h-6" />

          </Link>
        </nav>

      </div>
    </div>
  );
}