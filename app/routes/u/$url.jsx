import {
  useLoaderData,
  Form,
  useFetcher,
  useTransition,
} from "@remix-run/react";
import supabase from "~/utils/supabase";
import { useEffect, useState, useRef } from "react";
import { Queue } from "../../components/queue";
import { EmptyState } from "../../components/emptystate";
import { QueueHeader } from "../../components/queueheader";
import { getSession } from "~/utils/cookies";
import authRequired from "~/utils/authRequired";

// Load data
export const loader = async ({ params: { url }, request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  const { user } = await authRequired({ request });
  supabase.auth.setAuth(accessToken);

  const { data: customer, error } = await supabase
    .from("customer_profile")
    .select("*, queue(*)")
    //might need to be more specific later
    // .select("company_name, user_id, id, url, queue(id, customer_id, publicUser, status)")
    .match({ url })
    .single();
  if (error) {
    console.log(error.message);
  }

  const isAuthenticated = user?.id === customer?.id;

  return {
    customer,
    isAuthenticated,
    user,
  };
};

// Mutate Data
export const action = async ({ request }) => {
  const { user } = await authRequired({ request });
  const formData = await request.formData();
  const publicUser = formData.get("user");
  const { error } = await supabase.from("queue").insert({
    public_user: publicUser,
    status: "queued",
    is_complete: false,
    user_id: user.id,
  });

  if (error) {
    console.log(error.message);
  }
  return null;
};

export default () => {
  const {
    customer,
    isAuthenticated,
    // Will need user eventually
    //  user
  } = useLoaderData();
  const [queue, setQueue] = useState(customer ? [...customer.queue] : []);
  const fetcher = useFetcher();
  const transition = useTransition();
  const messageRef = useRef();

  useEffect(() => {
    if (transition.state !== "submitting") {
      console.log(transition.state);
      //reset input
      messageRef.current?.reset();
    }
  }, [transition.state]);

  useEffect(() => {
    if (customer !== null) {
      supabase
        .from(`queue:customer_id=eq.${customer.id}`)
        // .match(customer.id)
        .on("*", () => {
          fetcher.load(`/u/${customer.url}`);
        })
        .subscribe();
      return () => {
        supabase.unsubscribe();
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer]);

  useEffect(() => {
    if (fetcher.data) {
      setQueue([...fetcher.data.customer.queue]);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (customer !== null) {
      setQueue([...customer.queue]);
    }
  }, [customer]);

  return customer ? (
    <div className="mx-1 md:mx-8 lg:mx-24">
      <QueueHeader companyName={customer ? customer?.queue_title : "No User"} />
      {queue.length > 0 ? (
        <Queue list={queue} />
      ) : (
        <EmptyState state={isAuthenticated ? "authenticated" : "user_view"} />
      )}
      {isAuthenticated && (
        <Form ref={messageRef} className="queue-form mt-4" method="post">
          <input type="hidden" name="customerId" value={customer.id} />
          <input type="hidden" name="uid" value={customer.user_id} />
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                User
              </label>
              <span className="text-sm text-gray-500" id="email-optional">
                Required
              </span>
            </div>
            <div className="mt-1">
              <input
                type="text"
                name="user"
                id="user"
                className="shadow-sm focus:ring-indigo-500 h-10 p-4 focus:border-indigo-500 block w-full border-gray-300 rounded-md"
                placeholder="User: UmbreonChaser"
              />
            </div>
          </div>
          <div className="w-full text-right mt-2">
            <button className="button inline-flex items-center p-1.5 border border-transparent rounded shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              Add
            </button>
          </div>
        </Form>
      )}
    </div>
  ) : (
    <EmptyState state="no_customer" />
  );
};
