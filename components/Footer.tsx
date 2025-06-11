import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="bg-muddy border-t border-green-200 dark:border-green-800">
      <div className="mt-12 flex flex-col items-center pb-12">
        <div className="mb-6 flex space-x-4">
          {siteMetadata.github && <SocialIcon kind="github" href={siteMetadata.github} size={6} />}
          {siteMetadata.x && <SocialIcon kind="x" href={siteMetadata.x} size={6} />}
          {siteMetadata.email && (
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          )}
        </div>

        <div className="mb-4 text-center">
          <div className="font-display mb-2 text-lg text-gray-800 dark:text-gray-200">
            Mindmire{' '}
            <span className="font-serif text-sm text-green-600 dark:text-green-400">(MY-er)</span>
          </div>
          <div className="font-serif text-sm text-gray-600 italic dark:text-gray-400">
            "Sink into the Mire of My Mind"
          </div>
        </div>

        <div className="mb-4 flex flex-wrap justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-green-600 dark:hover:text-green-400"
          >
            {siteMetadata.headerTitle}
          </Link>
        </div>

        <div className="wavy-divider mb-4 max-w-xs"></div>

        <div className="text-center text-xs text-gray-400 dark:text-gray-500">
          <div>Built with the swampy vibes of Next.js and Tailwind CSS</div>
        </div>
      </div>
    </footer>
  )
}
