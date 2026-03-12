export default function GameCardSkeleton() {
  return (
    <div className="animate-pulse border rounded-xl overflow-hidden">

      <div className="h-40 bg-gray-300" />

      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>

    </div>
  )
}