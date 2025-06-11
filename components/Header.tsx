import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass =
    'flex items-center w-full bg-white/90 dark:bg-gray-900 backdrop-blur-sm justify-between px-2 sm:px-2 lg:px-2 border-b border-green-200 dark:border-green-800'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3 scale-50">
            <Logo />
          </div>
          <div className="flex flex-col">
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="font-display text-shadow-mire hidden h-6 text-2xl font-bold text-green-800 sm:block dark:text-green-200">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
            <div className="hidden text-xs font-medium text-green-600 italic sm:block dark:text-green-400">
              Sink into the Mire of My Mind
            </div>
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="m-1 rounded px-2 py-1 font-medium text-gray-700 transition-colors duration-200 hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-green-900/30 dark:hover:text-green-400"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
