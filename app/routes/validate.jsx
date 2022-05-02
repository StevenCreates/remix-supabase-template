import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";

export default ({ request }) => {
  const fetcher = useFetcher();

  useEffect(() => {
    const validate = async () => {

      fetcher.submit(null, {
        method: "post",
        action: "/auth/validate",
      });
    };
    validate();
  }, [request]);

  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className="spinner-grow inline-block w-12 h-12 bg-current rounded-full opacity-0"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
