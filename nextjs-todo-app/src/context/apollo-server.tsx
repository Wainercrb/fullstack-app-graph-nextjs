"use client";

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as AP,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL });

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default function ApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AP client={client}>{children}</AP>;
}
