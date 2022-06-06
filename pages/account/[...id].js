import { gql } from "@apollo/client";
import Image from "next/image";
import { client } from "../../lib/apollo-client";
import styles from "../../styles/Home.module.css";

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
  return { props: { account } };
}

export default function AccountPage({ account }) {
  return (
    <div className={styles.main}>
      <div className={styles.videoPageLayout}>
        <h1>{account.username}</h1>
        <Image
          src={account.avatar.url}
          width={90}
          height={90}
          alt={account.username}
        />
      </div>
    </div>
  );
}
