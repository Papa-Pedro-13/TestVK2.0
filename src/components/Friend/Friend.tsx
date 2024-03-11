import { User } from '../../types/types';

const Friend: React.FC<User> = ({ first_name, last_name }) => {
  return (
    <div>
      {first_name} {last_name}
    </div>
  );
};

export default Friend;
