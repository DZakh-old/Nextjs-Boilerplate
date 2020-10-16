import map from 'lodash/fp/map';

import { User } from '@/interfaces';

import { ListItem } from '@/components/connected/list-item';

type Props = {
  items: User[];
};

const List: React.FC<Props> = ({ items }) => {
  return (
    <ul>
      {map(
        (item) => (
          <li key={item.id}>
            <ListItem data={item} />
          </li>
        ),
        items
      )}
    </ul>
  );
};

export default List;
