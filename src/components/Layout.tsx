import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative overflow-y-auto overflow-x-hidden min-h-screen bg-warnaBG flex flex-col justify-between">
      <main className="mb-auto">{children}</main> 
    </div>
  );
};

export default Layout;
