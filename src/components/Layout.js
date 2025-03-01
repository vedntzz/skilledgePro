import { Outlet } from 'react-router-dom';
import { Star } from 'lucide-react';

const Layout = () => {
  const user = {
    name: 'John Developer',
    initials: 'JD'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SkillEdge Pro</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{user.name}</span>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                {user.initials}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;