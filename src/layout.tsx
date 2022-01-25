import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

function Layout() {
  return (
    <div className="min-h-screen pb-8">
      <Header />
      <main className="pt-8 pr-4 pb-16 pl-4 md:pt-16 md:pr-0 md:pl-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
