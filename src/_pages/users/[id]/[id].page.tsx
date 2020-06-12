import { User } from '@/interfaces';
import { Layout } from '@/components/layout';
import { ListDetail } from '@/components/list-detail';

type Props = {
  item?: User;
  errors?: string;
};

const UsersIdPage: React.FC<Props> = ({ item, errors }) => {
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
