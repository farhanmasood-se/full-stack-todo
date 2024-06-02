import MyNotes from '@/components/MyNotes';
import { UserButton } from '@clerk/nextjs';

const Dashboard = () => {
  const currentDate = new Date();

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="h-[90px] flex justify-between items-center px-10 border-b-[1px] border-b-gray-300">
        <h1 className="text-primary font-light text-2xl">
          Welcome , it is{' '}
          {currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </h1>
        <UserButton
          appearance={{
            elements: {
              userButtonBox: 'h-12 w-12',
              avatarBox: 'h-12 w-12',
            },
          }}
        />
      </div>

      <div className="px-10">
        <MyNotes />
      </div>
    </div>
  );
};

export default Dashboard;
