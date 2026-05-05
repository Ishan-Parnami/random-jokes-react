import { Laugh } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto p-4">
        <div className="flex items-center gap-3">
          <Laugh className="w-10 h-10" />
          <div>
            <h1 className="text-3xl font-bold">JokesHub</h1>
            <p className="text-blue-100 text-sm mt-1">
              Your daily dose of Chuck Norris humor
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;