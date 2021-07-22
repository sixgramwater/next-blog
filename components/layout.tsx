import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

const Layout: React.FC = (props) => {
  const { children } = props;
  return(
    <>
      <Navbar></Navbar>
      <main className="overflow-hidden min-h-screen">
        <div className="mt-14 max-w-3xl md:m-auto md:mt-14">
          {children}
        </div>
      </main>
      <Footer></Footer>
    </>
  )
}

export default Layout;