import Link from '@/components/Link'

export default function NotFound() {
  return (
    <div className="bg-muddy flex min-h-[60vh] flex-col items-center justify-center space-y-6">
      <div className="space-y-4 text-center">
        <div className="font-display text-shadow-mire text-8xl text-green-700 dark:text-green-400">
          404
        </div>
        <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-gray-100">
          Lost in the Mire?
        </h1>
        <p className="max-w-md font-serif text-lg text-gray-600 italic dark:text-gray-400">
          This page has sunk into the depths of the swamp. Don't worry, even the best explorers get
          lost in the mire sometimes.
        </p>
      </div>

      <div className="wavy-divider max-w-sm"></div>

      <div className="space-y-4 text-center">
        <div className="text-6xl">🐸</div>
        <Link href="/" className="mire-button inline-flex items-center">
          Return to Dry Land →
        </Link>
        <p className="font-serif text-sm text-gray-500 dark:text-gray-400">
          Or use the search to find what you're looking for
        </p>
      </div>
    </div>
  )
}
