'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useOnScroll } from '@/hooks'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import ThemeSwitch from '../theme-switch'
import { logo } from '../../../public/images'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/generate', label: 'Generate' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isScrolled = useOnScroll()

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 w-full',
        isScrolled
          ? 'bg-background/80 shadow-sm backdrop-blur-md border-b border-border/60 duration-300 ease-in-out'
          : 'bg-transparent',
      )}
    >
      <div className="container h-full px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex h-full items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src={logo} width={36} height={36} alt="SlideForge logo" />
            <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 bg-clip-text text-xl font-extrabold text-transparent hidden sm:block">
              SlideForge
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-150',
                    isActive
                      ? 'text-violet-600 dark:text-violet-400'
                      : 'text-foreground/70 hover:text-foreground hover:bg-accent',
                  )}
                >
                  {label}
                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-px h-0.5 rounded-full bg-violet-600 dark:bg-violet-400" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop right: theme + CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <ThemeSwitch />
            <Link
              href="/generate"
              className={cn(
                buttonVariants({ size: 'sm' }),
                'bg-violet-600 hover:bg-violet-700 text-white border-0',
              )}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile right: theme + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeSwitch />
            <button
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-md text-foreground hover:bg-accent transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="absolute left-0 top-16 w-full bg-background border-b border-border shadow-lg md:hidden">
            <ul className="flex flex-col p-4 gap-1">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        'block px-4 py-2.5 rounded-md text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300'
                          : 'text-foreground/80 hover:bg-accent hover:text-foreground',
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
              <li className="pt-2 border-t border-border mt-1">
                <Link
                  href="/generate"
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    buttonVariants({ size: 'sm' }),
                    'w-full bg-violet-600 hover:bg-violet-700 text-white border-0 justify-center',
                  )}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
