import { gql } from "@apollo/client";
import Image from "next/image";
import { client } from "../../lib/apollo-client";

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query getAccounts {
        accounts {
          id
        }
      }
    `,
  });
  const { accounts } = data;
  console.log(accounts);
  const paths = accounts.map((account) => ({
    params: { id: [account.id] },
  }));
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const id = params.id[0];
  const { data } = await client.query({
    query: gql`
      query getAccount($id: ID!) {
        accounts(where: { id: $id }) {
          id
          username
          avatar {
            url
          }
        }
      }
    `,
    variables: { id },
  });
  const { accounts } = data;
  const account = accounts[0];
  console.log(account);
  return { props: { account } };
}

export default function AccountPage({ account }) {
  return (
    <div>
      <h1>{account.username}</h1>
      <Image src={account.avatar.url} width={90} height={90} />
    </div>
  );
}