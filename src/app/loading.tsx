export default function Loading() {
  return (
    <div className="mx-auto w-full min-w-0 animate-pulse space-y-6 py-4">
      <div className="h-40 rounded-2xl bg-gray-200 sm:h-48" />

      <div className="h-6 w-40 max-w-full rounded bg-gray-200 sm:h-7 sm:w-48" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="min-w-0 space-y-3 rounded-xl border border-gray-100 bg-white p-3 sm:p-4"
          >
            <div className="h-10 w-10 rounded-lg bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
            <div className="h-6 w-2/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
