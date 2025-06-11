import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import tagData from 'app/tag-data.json'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  return genPageMetadata({
    title: `${tag} - ${siteMetadata.title}`,
    description: `${siteMetadata.title} - Posts tagged with ${tag}`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const paths = tagKeys.map((tag) => ({
    tag: encodeURI(slug(tag)),
  }))
  return paths
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const decodedTag = decodeURI(tag)
  const title = decodedTag[0].toUpperCase() + decodedTag.split(' ').join(' ').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(decodedTag))
    )
  )

  if (filteredPosts.length === 0) {
    return notFound()
  }

  const pageNumber = 1
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  )
}
