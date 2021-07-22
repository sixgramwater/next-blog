import React from 'react';
import Logo from '../public/favicon.ico';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './navbar.module.css';
import classNames from 'classnames';

export interface NavbarProps {
  
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const router = useRouter();
  React.useEffect(()=>{
    console.log(router.pathname)
  }, [router.pathname])
  const navItemStyle = "ml-6 inline-block text-gray-700 font-semibold relative";
  
  return(
    <header className="navbar w-full bg-white shadow-md fixed z-10 overflow-hidden">
      <nav className="navbar-inner max-w-3xl mx-auto px-1 md:px-0 h-14 py-3.5 flex">
        <div className="logo flex align-middle">
          {/* <Image 
            src={Logo}
            alt="logo"
            width={28}
            height={28}
          /> */}
          <h1 className="font-semibold text-xl">Liquid Blog</h1>
        </div>
        <ul className="flex flex-nowrap ml-auto leading-8">
          {/* <li>{router.pathname}</li> */}
          <li className={classNames(navItemStyle, styles.navItem, router.pathname==='/'? styles.active: ''
            )}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={classNames(navItemStyle, styles.navItem,router.pathname.includes('posts')? styles.active: ''
            )}>
            <Link href="/posts/postList">
              <a>Posts</a>
            </Link>
          </li>
          <li className={classNames(navItemStyle, styles.navItem,router.pathname.includes('blog')? styles.active: ''
            )}>
            <Link href="/blogs">
              <a>Blogs</a>
            </Link>
          </li>
        </ul>
        <div className="avatar w-8 h-8 bg-gray-300 rounded-full ml-5"></div>
      </nav>
    </header>
    
  )
}

export default Navbar;