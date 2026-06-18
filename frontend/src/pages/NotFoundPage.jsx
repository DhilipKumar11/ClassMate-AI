import { NavLink, useRouteError } from "react-router-dom";
import { Button } from "../components/common/Button";

export function NotFoundPage() {
  const error = useRouteError();
  const detail =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : null;

  return (
    <div className="section-shell flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl">Page not found</h1>
      <p className="muted mt-4 max-w-xl">
        The requested route does not exist in the current ClassMate AI scaffold.
      </p>
      {detail ? <p className="mt-4 max-w-2xl text-sm text-rose-500">{detail}</p> : null}
      <Button as={NavLink} to="/" className="mt-8">
        Return Home
      </Button>
    </div>
  );
}
