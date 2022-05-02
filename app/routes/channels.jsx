import { useLoaderData, Link, Outlet } from "@remix-run/react";
import supabase from "~/utils/supabase";

export const loader = async () => {
  const { data: channels, error } = await supabase.from("channels").select("id, title");
  if (error) {
    console.log(error.message);
  }
  return {
    channels,
  };
};

export default () => {
  const { channels } = useLoaderData();
  console.log(supabase.auth.user())

  return (
    <div>
      {channels.map((channel) => (
        <p key={channel.id}>
          <Link to={`/channels/${channel.id}`}>{channel.title}</Link>
        </p>
      ))}
      <Outlet />
    </div>
  );
};
