import { createHashRouter } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { HomePage } from "../pages/HomePage";
import { ConceptPage } from "../pages/ConceptPage";
import { TranslationPage } from "../pages/TranslationPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <AppShell />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "concept", element: <ConceptPage /> },
      { path: "translation", element: <TranslationPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
