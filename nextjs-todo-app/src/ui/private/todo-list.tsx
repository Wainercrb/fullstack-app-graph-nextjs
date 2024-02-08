"use client";

import { useApolloClient, useQuery } from "@apollo/client";
import { GET_TODOS } from "@/graphql/todo";

export default function ToDoList() {
  const apolloClient = useApolloClient();
  const { loading, error, data } = useQuery(GET_TODOS, {
    variables: { take: 5 },
  });

  if (loading) return <p>Loading todos</p>;

  if (error) return <p>error</p>;

  return (
    <ul>
      {data &&
        data.toDos.list.map((item) => {
          return <li key={item.id}>{item.title}</li>;
        })}

      <button
        onClick={async () => {
          //   await apolloClient.clearStore();
          console.log(apolloClient.cache);
        }}
      >
        logout
      </button>
    </ul>
  );
}
