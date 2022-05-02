import { useEffect } from "react";
import supabase from "~/utils/supabase";
import { useFetcher } from "@remix-run/react";

export default () => {
  const fetcher = useFetcher();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();

      fetcher.submit(null, {
        method: "post",
        action: "/auth/logout",
      });
    };
    logout();
  }, []);

  return <p>Logging out...n</p>;
};
