import { Link } from "@solidjs/router";
import { createResource, createSignal, onMount, Show } from "solid-js";
import { request } from "graphql-request";

const gql = String.raw;

export default function Home() {
  const [mounted, setMount] = createSignal(false);

  onMount(() => {
    setMount(true);
  });

  return (
    <div>
      <h1>hello</h1>
      <Show when={mounted()}>
        <GqlQueryTest />
      </Show>
    </div>
  );
}

export const GqlQueryTest = (props) => {
  const [result, status] = createResource(() =>
    request(
      "/graphql",
      gql`
        {
          hello
        }
      `
    )
  );

  const data = () =>
    result.latest ? JSON.stringify(result.latest) : undefined;

  return <pre>{data}</pre>;
};
