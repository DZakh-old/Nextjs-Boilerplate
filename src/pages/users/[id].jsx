import find from 'lodash/fp/find';
import map from 'lodash/fp/map';

import { sampleUserData } from '@/utils/sample-data';

import { Layout } from '@/components/connected/layout';
import { ListDetail } from '@/components/connected/list-detail';

const UsersIdPage = ({ item, errors }) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={`${item ? item.name : 'User Detail'} | Next.js + TypeScript Example`}>
      {item && <ListDetail item={item} />}
    </Layout>
  );
};

export default UsersIdPage;

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const paths = map((user) => {
    return {
      params: { id: user.id.toString() },
    };
  }, sampleUserData);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    const item = find((data) => {
      return data.id === Number(id);
    }, sampleUserData);
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
