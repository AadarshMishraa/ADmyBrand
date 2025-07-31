import { useEffect } from "react";
import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Log the bad route for observability
    console.error("404 Error: attempted route ->", router.asPath);
  }, [router.asPath]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background">
      <div className="text-center p-8">
        <h1 className="text-6xl font-extrabold mb-4 text-primary">404</h1>
        <p className="text-xl text-gray-600 dark:text-text-secondary mb-6">Oops! Page not found.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default Custom404;
