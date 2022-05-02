import { useLoaderData, Link, Outlet } from "@remix-run/react";
import supabase from "~/utils/supabase";
import authRequiredPlusLogout from "~/utils/authRequiredPlusLogout";
import { getSession } from "~/utils/cookies";

import {
  CogIcon,
  ClipboardListIcon,
  HomeIcon,
  InboxIcon,
  ChartPieIcon,
  BellIcon,
} from "@heroicons/react/outline";

export const loader = async ({ request }) => {
  const { user } = await authRequiredPlusLogout({ request });
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  supabase.auth.setAuth(accessToken);

  const { data: customer, error } = await supabase
    .from("customer_profile")
    .select("*, queue(*)")
    //might need to be more specific later
    // .select("company_name, user_id, id, url, queue(id, customer_id, publicUser, status)")
    .match({ id: user?.id })
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

export default () => {
  const { customer } = useLoaderData();
  //   console.log(supabase.auth.user()
  console.log("test", customer);

  const navigation = [
    { name: "Dashboard", icon: HomeIcon, to: "#", current: true },
    { name: "Notify", icon: BellIcon, to: "#", count: 4, current: false },
    { name: "Stats", icon: ChartPieIcon, to: "#", count: 3, current: false },
    { name: "Queue", icon: ClipboardListIcon, to: "/u/", current: false },
    {
      name: "Documents",
      icon: InboxIcon,
      href: "#",
      count: 12,
      current: false,
    },
    { name: "Settings", icon: CogIcon, href: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col min-h-0  w-64 h-full xs:w-full sm:w-full md:w-64 bg-gray-800">
        <div className="flex-1 flex w-64 flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Lif"
            />
          </div>
          <nav
            className="mt-5 flex-1 px-2 bg-gray-800 space-y-1"
            aria-label="Sidebar"
          >
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-gray-300"
                      : "text-gray-400 group-hover:text-gray-300",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                <span className="flex-1">{item.name}</span>
                {/* {item.count ? (
                  <span
                    className={classNames(
                      item.current ? 'bg-gray-800' : 'bg-gray-900 group-hover:bg-gray-800',
                      'ml-3 inline-block py-0.5 px-3 text-xs font-medium rounded-full'
                    )}
                  >
                    {item.count}
                  </span>
                ) : null} */}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex bg-gray-700 p-4">
          {/*
           eslint-disable-next-line jsx-a11y/anchor-is-valid
          */}
          <a href="#" className="flex-shrink-0 w-full group block">
            {/* Will update the a tag to a LINK */}
            <div className="flex items-center">
              <div>
                {/* <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                /> */}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {customer?.url}
                </p>
                <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                  View profile
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <Outlet />
    </div>
  );
};
