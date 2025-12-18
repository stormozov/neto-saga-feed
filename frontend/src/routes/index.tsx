import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import { withSuspense } from "./hocs";

const Layout = lazy(() => import("@/layouts/Layout/Layout"));

const Homepage = lazy(
	() => import("@pages/ReduxSagaDemoPage/HomePage/HomePage"),
);
const NotFound = lazy(
	() => import("@pages/ReduxSagaDemoPage/NotFoundPage/NotFoundPage"),
);

export default function createAppRouter() {
	const LayoutWithSuspense = withSuspense(Layout);
	const HomepageWithSuspense = withSuspense(Homepage);
	const NotFoundWithSuspense = withSuspense(NotFound);

	return createBrowserRouter([
		{
			path: "/",
			element: <LayoutWithSuspense />,
			children: [
				{ index: true, element: <HomepageWithSuspense /> },
				{ path: "*", element: <NotFoundWithSuspense /> },
			],
		},
	]);
}
