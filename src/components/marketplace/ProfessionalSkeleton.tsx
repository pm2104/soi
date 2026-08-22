export default function ProfessionalSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-16 w-16 rounded-xl bg-light-gray" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-light-gray rounded w-3/4" />
            <div className="h-3 bg-light-gray rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-light-gray rounded w-full" />
          <div className="h-3 bg-light-gray rounded w-5/6" />
        </div>
        <div className="h-9 bg-light-gray rounded-xl" />
      </div>
    </div>
  );
}