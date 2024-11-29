// Native modules
import { ReactNode, Suspense as MainSuspense } from "react";

// Custom Components
import ErrorBoundary from "./ErrorBoundary";
import LoadingScreen from "../animate/LoadingScreen";

// -----------------------------------------------------------------------------
// Component: Suspense
// Purpose: A custom Suspense component for handling lazy-loaded components and errors.
// Parameters:
// - children: The child components to be wrapped by the Suspense component.
// - error_fallback: The fallback to be displayed in case of an error.
// - fallback: The default fallback to be displayed during loading.
// -----------------------------------------------------------------------------
interface SuspenseProps {
  children: ReactNode;
  error_fallback?: ReactNode;
  fallback?: ReactNode;
}

const Suspense = ({ children, error_fallback = "error", fallback = <LoadingScreen /> }: SuspenseProps) => {
  return (
    <ErrorBoundary fallback={error_fallback}>
      <MainSuspense fallback={fallback}>{children}</MainSuspense>
    </ErrorBoundary>
  );
};

export default Suspense;
