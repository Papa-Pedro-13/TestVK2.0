import Group from '../Group/Group';

import { useAppSelector } from '../../hooks/hooks';
import Filters from '../Filters/Filters';

const Home = () => {
  const {
    groups: { filtered },
  } = useAppSelector((state) => state);

  return (
    <>
      <Filters />
      {filtered?.map((group) => (
        <Group
          key={group.id}
          {...group}
        />
      ))}
    </>
  );
};

export default Home;
