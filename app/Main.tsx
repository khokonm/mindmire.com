import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-green-200/60 dark:divide-green-800/60">
        <div className="bg-muddy space-y-4 pt-8 pb-8 md:space-y-6">
          <h1 className="font-display text-shadow-mire text-center text-4xl leading-tight font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight dark:text-gray-100">
            Welcome to the Mire
          </h1>
          <p className="mx-auto max-w-3xl text-center font-serif text-lg leading-7 text-gray-600 italic dark:text-gray-400">
            {siteMetadata.description}
          </p>
          <div className="wavy-divider mx-auto max-w-md"></div>
        </div>
        <div className="space-y-8 pt-8">
          {!posts.length && (
            <div className="mire-card p-8 text-center">
              <p className="font-serif text-gray-500 dark:text-gray-400">
                No posts found. The mire is empty... for now.
              </p>
            </div>
          )}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <article
                key={slug}
                className="mire-card hover:mire-card-featured p-6 transition-all duration-300"
              >
                <div className="space-y-4 xl:grid xl:grid-cols-4 xl:items-start xl:gap-x-6 xl:space-y-0">
                  <div className="xl:col-span-1">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-green-600 dark:text-green-400">
                        <time dateTime={date} className="font-serif">
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                  </div>
                  <div className="space-y-4 xl:col-span-3">
                    <div className="space-y-3">
                      <div>
                        <h2 className="font-display text-2xl leading-8 font-bold tracking-tight">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-gray-900 transition-colors duration-200 hover:text-green-700 dark:text-gray-100 dark:hover:text-green-300"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose max-w-none font-serif text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/blog/${slug}`}
                        className="mire-button-secondary text-sm"
                        aria-label={`Read more: "${title}"`}
                      >
                        Dive Deeper →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-center pt-8">
          <Link href="/blog" className="mire-button" aria-label="All posts">
            Explore All Posts →
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-green-50 to-amber-50 p-8 dark:from-gray-800 dark:to-gray-800">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              Stay Updated
            </h3>
            <p className="mt-2 font-serif text-gray-600 dark:text-gray-300">
              Subscribe to get notified about new posts and updates from the mire.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
