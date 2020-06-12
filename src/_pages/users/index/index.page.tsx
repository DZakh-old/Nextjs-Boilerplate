import Link from 'next/link';

import { User } from '@/interfaces';
import { Layout } from '@/components/layout';
import { List } from '@/components/list';

type Props = {
  items: User[];
};

const UsersIndexPage: React.FC<Props> = ({ items }) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default UsersIndexPage;
