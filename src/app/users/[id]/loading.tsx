export default function LoadingUser() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-40 bg-gray-200 rounded" />
        <div className="h-5 w-28 bg-gray-200 rounded" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="rounded-xl border p-6">
          <div className="h-5 w-48 bg-gray-200 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-64 bg-gray-200 rounded" />
            <div className="h-4 w-56 bg-gray-200 rounded" />
            <div className="h-4 w-72 bg-gray-200 rounded" />
            <div className="h-4 w-44 bg-gray-200 rounded" />
            <div className="h-4 w-52 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="rounded-xl border p-6">
          <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-40 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-36 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
            <div className="h-4 w-56 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border p-6">
        <div className="h-5 w-28 bg-gray-200 rounded mb-4" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="h-4 w-48 bg-gray-200 rounded" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
