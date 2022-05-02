import { useLoaderData, Form, useFetcher } from "@remix-run/react";
import supabase from "~/utils/supabase";
import { useEffect, useState } from "react";

// Load data
export const loader = async ({ params: { id } }) => {
  const { data: channel, error } = await supabase
    .from("channels")
    .select("id, title, description, messages(id, content)")
    .match({ id })
    .single();
  if (error) {
    console.log(error.message);
  }

  return {
    channel,
  };
};

// Mutate Data
export const action = async ({ request }) => {
  const formData = await request.formData();
  const content = formData.get("content");
  const channelId = formData.get("channelId");
  const { error } = await supabase
    .from("messages")
    .insert({ content, channel_id: channelId });
  if (error) {
    console.log(error.message);
  }
  return null;
};

export default () => {
  const { channel } = useLoaderData();
  const [messages, setMessages] = useState([...channel.messages]);
  const fetcher = useFetcher();

  useEffect(() => {
    supabase
      .from(`messages:channel_id=eq.${channel.id}`)
      .on("*", (payload) => {
        // setMessages(current => [...current, {id: payload.new.id, content: payload.new.content}]);
        fetcher.load(`/channels/${channel.id}`)
      })
      .subscribe();
  }, []);

  useEffect(() => {
    if(fetcher.data){
      setMessages([...fetcher.data.channel.messages]);
    }
  }, [fetcher.data])


  useEffect(() => {
    setMessages([...channel.messages])
  }, [channel])

  return (
    <div>
      <pre key={channel}>{JSON.stringify(messages, null, 2)}</pre>
      <Form method="post">
        <input name="content" />
        <input type="hidden" name="channelId" value={channel.id} />
        <button>Send!</button>
      </Form>
    </div>
  );
};
