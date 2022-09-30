import { createServer } from "@graphql-yoga/common";
import { ApiHandler } from "solid-start/api/types";

const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello from Yoga!",
      },
    },
  },
});

const handler: ApiHandler = ({ request }) => {
  return server.handleRequest(request);
};

export const get = handler;
export const post = handler;
