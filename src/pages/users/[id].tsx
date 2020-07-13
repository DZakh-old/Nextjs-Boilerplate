/* eslint-disable react/jsx-props-no-spreading */
import { GetStaticProps, GetStaticPaths } from 'next';

import map from 'lodash/fp/map';
import find from 'lodash/fp/find';

import { UsersIdPage } from '@/_pages/users/[id]';
import { User } from '@/interfaces';
import { sampleUserData } from '@/utils/sample-data';

type StaticProps = {
  item?: User;
  errors?: string;
};

const Page: React.FC<StaticProps> = (props) => {
  return <UsersIdPage {...props} />;
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const paths = map(
    (user) => ({
      params: { id: user.id.toString() },
    }),
    sampleUserData
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    const item = find((data) => data.id === Number(id), sampleUserData);
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
