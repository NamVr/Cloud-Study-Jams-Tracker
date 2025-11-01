import { Suspense } from 'react';
import { ProgressTable } from '@/components/shared/progress-table';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingFallback() {
  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
       <section className="text-center mb-8">
        <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-6 w-3/4 mx-auto" />
      </section>

      <Skeleton className="h-12 w-full mb-8" />
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-5 w-48" />
      </div>

      <Skeleton className="h-[600px] w-full" />
    </div>
  );
}

export default function ProgressPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProgressTable />
    </Suspense>
  );
}
