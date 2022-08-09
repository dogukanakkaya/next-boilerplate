import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type MouseEvent } from 'react';
import logoDark from '@images/logo-dark.png';
import logoWhite from '@images/logo-white.png';

export default function Header() {
    const { data: session } = useSession();
    const [navOpen, setNavOpen] = useState(false);

    const handleNavClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).tagName === 'NAV') {
            setNavOpen(false);
        }
    };

    return (
        <header className="h-20 dark:bg-[#010102] shadow">
            <div className="container mx-auto flex items-center justify-between h-full">
                <div className="relative z-50 mt-2 mx-5 sm:mx-0">
                    <Link href="/">
                        <a className="hidden dark:block">
                            <Image src={logoWhite} alt="Logo" width="200" height="60" objectFit="contain" />
                        </a>
                    </Link>
                    <Link href="/">
                        <a className="block dark:hidden">
                            <Image src={logoDark} alt="Logo" width="200" height="60" objectFit="contain" />
                        </a>
                    </Link>
                </div>
                <nav className={`fixed z-40 inset-0 h-full bg-black bg-opacity-25 w-full sm:static sm:block ${!navOpen ? 'hidden' : ''}`} onClick={handleNavClick}>
                    <div className="h-full overflow-y-auto sm:flex sm:justify-end sm:items-center overflow-hidden bg-white dark:bg-[#010102] mr-36 sm:mr-0">
                        <ul className="mx-5 mt-20 sm:mt-0 sm:mx-0 flex flex-col sm:flex-row items-center">
                            <li><Link href="/item"><a className="nav-item">Items</a></Link></li>
                            {
                                session && (
                                    <li className="mt-5 h-[50px] sm:mt-0 sm:ml-5">
                                        <Image src={session.user?.image || ''} alt={session.user?.name || ''} width="50" height="50" className="rounded-full" />
                                    </li>
                                )
                            }

                        </ul>
                    </div>
                </nav>
                <div className="sm:hidden mx-5 sm:mx-0">
                    <button onClick={() => setNavOpen(!navOpen)}><i className="bi bi-list dark:text-white text-3xl"></i></button>
                </div>
            </div>
        </header>
    );
}
