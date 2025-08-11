import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="mt-2 text-muted-foreground">Oops! Page not found</p>
          <div className="mt-6">
            <Button asChild>
              <a href="/">Return Home</a>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
