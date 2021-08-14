import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar(false);

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      //Type policy map
      Query: {
        fields: {
          //Field policy map for the Product type
          isLoggedIn: {
            read() {
              //The read function for the isLoggedIn field. read는 field값을 반환하다.
              return isLoggedInVar();
            },
          },
        },
      },
    },
  }),
});
