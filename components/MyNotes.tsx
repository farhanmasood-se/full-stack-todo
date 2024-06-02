'use client';

import { SquarePlus } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

const MyNotes = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div
        className="w-full flex justify-between items-center"
        onClick={() => setOpenModal(true)}
      >
        <h1 className="text-4xl font-bold">Notes</h1>

        <Button className="flex gap-2 items-center justify-center h-[45px] w-[150px]">
          <SquarePlus strokeWidth={1.5} />
          New Note
        </Button>
      </div>
    </div>
  );
};

export default MyNotes;
