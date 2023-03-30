import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

function Layout() {
  return (
    <div className="min-h-screen pb-8">
      <Header />
      <main className="pb-16 pl-4 pr-4 pt-8 md:pl-0 md:pr-0 md:pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
