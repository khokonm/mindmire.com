import { allBlogs } from 'contentlayer/generated'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Mire Map' })

export default async function MireMapPage() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  // Create a map of tags to posts
  const tagMap = new Map<string, typeof posts>()
  const allTags = new Set<string>()

  posts.forEach((post) => {
    post.tags?.forEach((tag: string) => {
      allTags.add(tag)
      if (!tagMap.has(tag)) {
        tagMap.set(tag, [])
      }
      tagMap.get(tag)?.push(post)
    })
  })

  const sortedTags = Array.from(allTags).sort()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-muddy space-y-4 border-b border-green-200 pt-6 pb-8 dark:border-green-800">
        <h1 className="font-display text-shadow-mire text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          The Mire Map
        </h1>
        <p className="mx-auto max-w-2xl text-center font-serif text-lg text-gray-600 italic dark:text-gray-400">
          Navigate the tangled web of thoughts. Each tag is a path through the swampy depths of my
          mind.
        </p>
        <div className="wavy-divider mx-auto max-w-md"></div>
      </div>

      {/* Tag Cloud */}
      <div className="mire-card p-8">
        <h2 className="font-display mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Tag Cloud
        </h2>
        <div className="flex flex-wrap gap-3">
          {sortedTags.map((tag: string) => {
            const postCount = tagMap.get(tag)?.length || 0
            const size = Math.min(Math.max(postCount, 1), 5)
            const sizeClasses = {
              1: 'text-sm',
              2: 'text-base',
              3: 'text-lg',
              4: 'text-xl',
              5: 'text-2xl',
            }
            return (
              <div key={tag} className="group relative">
                <Tag text={tag} />
                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 transform rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {postCount} post{postCount !== 1 ? 's' : ''}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Posts by Tag */}
      <div className="grid gap-6 lg:grid-cols-2">
        {sortedTags.map((tag: string) => {
          const tagPosts = tagMap.get(tag) || []
          return (
            <div key={tag} id={tag.toLowerCase().replace(/\s+/g, '-')} className="mire-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-gray-100">
                  #{tag}
                </h3>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {tagPosts.length} post{tagPosts.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-3">
                {tagPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.slug}
                    className="border-l-2 border-green-300 pl-4 dark:border-green-700"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-medium text-gray-800 transition-colors duration-200 hover:text-green-700 dark:text-gray-200 dark:hover:text-green-300"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                      {post.summary}
                    </p>
                  </div>
                ))}
                {tagPosts.length > 3 && (
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    +{tagPosts.length - 3} more posts in this tag
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Network Visualization Placeholder */}
      <div className="mire-card p-8 text-center">
        <h2 className="font-display mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Interactive Mind Map
        </h2>
        <p className="mb-6 font-serif text-gray-600 italic dark:text-gray-400">
          Coming soon: A visual network showing the connections between posts and concepts in the
          mire.
        </p>
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20">
          <div className="text-center">
            <div className="mb-2 text-4xl">🗺️</div>
            <p className="font-medium text-green-600 dark:text-green-400">
              Interactive visualization coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
