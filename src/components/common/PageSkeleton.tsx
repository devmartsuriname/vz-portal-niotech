import { Skeleton } from "@/components/ui/skeleton";

/**
 * PageSkeleton - Fallback component for lazy-loaded pages
 * Provides a lightweight loading state while page components are being fetched
 */
const PageSkeleton = () => {
  return (
    <div className="page-skeleton">
      {/* Breadcrumb skeleton */}
      <div className="bg-muted/20 py-20">
        <div className="container">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Content sections skeleton */}
      <div className="container py-16">
        <div className="space-y-12">
          {/* Section 1 */}
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-64 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
