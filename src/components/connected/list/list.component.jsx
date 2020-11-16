import map from 'lodash/fp/map';

import { ListItem } from '@/components/connected/list-item';

const List = ({ items }) => {
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
