import { useRouteError } from 'react-router-dom';

export default function RouteError() {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-destructive">Something went wrong</h1>
        <p className="text-muted-foreground">
          An error occurred while loading this page. Please try reloading.
        </p>
        {error && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium">Error details</summary>
            <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
              {error.message || String(error)}
            </pre>
          </details>
        )}
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary/90 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}
