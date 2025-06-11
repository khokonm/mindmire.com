import React from 'react'
import siteMetadata from '@/data/siteMetadata'

interface SocialShareProps {
  title: string
  url: string
  summary?: string
  slug: string
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url, summary, slug }) => {
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)
  const encodedSummary = encodeURIComponent(summary || '')

  const shareText = `${title} - ${summary || 'Dive into the mire of thoughts'}`
  const encodedShareText = encodeURIComponent(shareText)

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedUrl}&via=Mindmire`
  const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedShareText}%20${encodedUrl}`
  const editUrl = `${siteMetadata.siteRepo}/edit/main/data/blog/${slug}.mdx`

  return (
    <div className="flex flex-wrap items-center gap-4 border-t border-green-200 py-6 dark:border-green-800">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Share this post:</div>

      <div className="flex gap-3">
        {/* Twitter/X Share */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md border border-blue-600 bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:border-blue-700 hover:bg-blue-600"
        >
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </a>

        {/* Email Share */}
        <a
          href={emailUrl}
          className="inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Email
        </a>

        {/* Edit on GitHub */}
        <a
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition-colors duration-200 hover:bg-green-100 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50"
        >
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Edit on GitHub
        </a>
      </div>
    </div>
  )
}

export default SocialShare
