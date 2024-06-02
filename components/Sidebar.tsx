'use client';

import { ChevronsLeft, LogOut, Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useClerk } from '@clerk/nextjs';

const SearchField = () => (
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
    <input
      className="w-full h-[44px] pl-10 focus:outline-none rounded-lg border border-gray-300"
      placeholder="Search notes..."
    />
  </div>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { user } = useAuth();
  const { signOut } = useClerk();

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (isOpen) {
        if (event.ctrlKey && event.key === 'd') {
          event.preventDefault();
          setShowModal(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={cn(
        'h-screen bg-primary-foreground transition-all duration-500 flex flex-col justify-between items-start pb-5',
        isOpen ? 'w-[350px] justify-between px-2' : 'w-[100px] px-2',
      )}
    >
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-5 w-full',
          isOpen && 'items-start',
        )}
      >
        <div
          className={cn(
            'relative flex justify-between items-center w-full h-[90px]',
            !isOpen && 'justify-center',
          )}
        >
          <Link
            href="/dashboard"
            className={cn('text-3xl font-semibold transition-all duration-700')}
          >
            {isOpen ? (
              <span
                className={cn(
                  'transition-all duration-300',
                  isOpen ? 'opacity-100' : 'opacity-0',
                )}
              >
                My Notes
              </span>
            ) : (
              <span
                className={cn(
                  'transition-all duration-500',
                  isOpen ? 'opacity-0' : 'opacity-100',
                )}
              >
                MN
              </span>
            )}
          </Link>

          <div
            className={cn(
              'flex justify-center items-center absolute right-[-20px] top-[30%] cursor-pointer bg-primary w-6 h-6 rounded-full transition-all duration-500',
              !isOpen && 'rotate-180',
            )}
            onClick={toggleSidebar}
          >
            <ChevronsLeft strokeWidth={1.5} className="text-white h-4 w-4" />
          </div>
        </div>

        {isOpen && (
          <div className="w-full">
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogTrigger className="w-full">
                <SearchField />
              </DialogTrigger>
              <DialogContent className="outline-none h-[200px]">
                <DialogHeader
                  className="w-full flex justify-start items-center gap-4"
                  style={{ fontFamily: 'Lobster, cursive' }}
                >
                  <DialogTitle>Search My Notes</DialogTitle>
                  <DialogDescription>
                    Search for notes by title, content, or tags.
                  </DialogDescription>
                  <SearchField />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      <Button
        className={cn(
          'flex justify-center items-center gap-5 cursor-pointer w-full bg-transparent hover:bg-primary text-primary hover:text-white transition-all duration-500 h-[50px]',
        )}
      >
        <LogOut strokeWidth={1.5} className="h-8 w-8" />

        {isOpen && (
          <h1 className={cn('text-2xl', isOpen ? 'opacity-100' : 'opacity-0')}>
            Logout
          </h1>
        )}
      </Button>
    </div>
  );
};

export default Sidebar;
