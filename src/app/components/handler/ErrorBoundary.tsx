import { Component, ReactNode } from "react";
import { Stack, Typography } from "@mui/material";
import CustomButton from "../Buttons/CustomButton";

// -----------------------------------------------------------------------------
// Class: ErrorBoundary
// Purpose: A custom ErrorBoundary component for handling errors and displaying error information.
// Parameters:
// - fallback: The fallback UI to display when an error occurs.
// - children: The child components wrapped by the ErrorBoundary.
// -----------------------------------------------------------------------------
class ErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean; error?: Error } {
    return { hasError: true, error };
  }

  // componentDidCatch(error: Error, info: ErrorInfo): void {
  // Example "componentStack":
  //   in ComponentThatThrows (created by App)
  //   in ErrorBoundary (created by App)
  //   in div (created by App)
  //   in App
  // }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

// -----------------------------------------------------------------------------
// Component: ErrorComponent
// Purpose: A component for displaying detailed error information.
// Parameters:
// - error: The error object containing name, message, and stack.
// -----------------------------------------------------------------------------
const ErrorComponent = ({ error }: { error: Error | undefined }) => {
  const bg = { p: 2, borderRadius: 1, bgcolor: "#f2f2f2", gap: 1, overflow: "auto" };

  return (
    <Stack height={1} p={{ xs: 2, sm: 5 }} gap={4} overflow={"auto"}>
      <Typography variant="h3" color={"gray"}>
        Something went wrong !!
      </Typography>

      <Stack direction={"row"} gap={3}>
        <CustomButton variant="soft" color="error" onClick={() => window.location.reload()}>
          Click to reload
        </CustomButton>
      </Stack>

      <Stack {...bg} overflow={"auto"}>
        <Typography variant="h6" component={"pre"}>
          {error?.name}
        </Typography>
        <Typography variant="caption" component={"pre"}>
          {error?.stack}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ErrorBoundary;
