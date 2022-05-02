import { getSession } from "~/utils/cookies";
import supabase from "~/utils/supabase";
import { redirect } from "@remix-run/node";

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const { user } = await supabase.auth.api.getUser(accessToken);

  const { data: customer, error } = await supabase
    .from("customer_profile")
    .select("*")
    .match({ id: user.id })
    .single();
  if (error) {
    console.log(error.message);
  }
  console.log(customer)
  if (!user) {
    return redirect("/login");
  }
  if (customer.paid_tier === 'free'){
      return redirect("/1/dashboard")
  }
  if (customer.paid_tier === 'tier_3'){
    return redirect("/dashboard")
}
};
