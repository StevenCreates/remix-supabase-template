import supabase from "~/utils/supabase";
import { getSession } from "~/utils/cookies";
import { redirect } from "@remix-run/node";

export default async (context) => {
  const session = await getSession(context.request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const { user } = await supabase.auth.api.getUser(accessToken);

  const result = {
    supabase,
    user,
    accessToken,
    redirect: null,
  };
  if (!user) {
      return redirect('/login')
  }

  await supabase.auth.setAuth(accessToken);

  return result;
};
