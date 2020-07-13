/* eslint-disable react/jsx-props-no-spreading */
import { GetStaticProps } from 'next';

import { UsersIndexPage } from '@/_pages/users/index';

import { User } from '@/interfaces';
import { sampleUserData } from '@/utils/sample-data';

type StaticProps = {
  items: User[];
};

const Page: React.FC<StaticProps> = (props) => {
  return <UsersIndexPage {...props} />;
};

export default Page;

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = sampleUserData;
  return { props: { items } };
};
