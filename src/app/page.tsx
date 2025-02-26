import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to BrandBlitz</h1>
      <p className="text-lg max-w-2xl text-center">
        A conversational design studio platform featuring a dual-panel interface:
        a chat system for communication and a design workspace for collaboration.
      </p>
      
      <div className="mt-8 space-y-4">
        <section id="itemh1" className="p-4 bg-[#35989e]/20 rounded-md">
          <h2 className="text-xl font-bold">Section 1</h2>
          <p>This is the first section of the home page.</p>
        </section>
        
        <section id="itemh2" className="p-4 bg-[#35989e]/20 rounded-md">
          <h2 className="text-xl font-bold">Section 2</h2>
          <p>This is the second section of the home page.</p>
        </section>
        
        <section id="itemh3" className="p-4 bg-[#35989e]/20 rounded-md">
          <h2 className="text-xl font-bold">Section 3</h2>
          <p>This is the third section of the home page.</p>
        </section>
        
        <section id="itemh4" className="p-4 bg-[#35989e]/20 rounded-md">
          <h2 className="text-xl font-bold">Section 4</h2>
          <p>This is the fourth section of the home page.</p>
        </section>
      </div>
    </div>
  );
}