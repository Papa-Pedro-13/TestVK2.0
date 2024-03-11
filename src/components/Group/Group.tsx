import './group.css';
import { GroupType } from '../../types/types';
import { useState } from 'react';
import Friend from '../Friend/Friend';

const Group: React.FC<GroupType> = ({
  name,
  closed,
  avatar_color,
  members_count,
  friends,
}) => {
  const [showedFriend, setShowedFriend] = useState(false);

  return (
    <div className='group'>
      <div className='group__block'>
        <div className='group__name'>{name}</div>
        {avatar_color && (
          <div
            className='avatar'
            style={{ backgroundColor: avatar_color }}
          ></div>
        )}
      </div>
      <div className='group__block'>
        <div className='group__type'>
          Тип группы <span>{closed ? 'закрытая' : 'открытая'}</span>
        </div>
        <div className='group__type'>
          Количество подписчиков: <span>{members_count}</span>
        </div>
      </div>

      {friends?.length && (
        <div className='group__block'>
          <div className='group__count'>
            Количество друзей:{' '}
            <span onClick={() => setShowedFriend(!showedFriend)}>
              {friends.length}
            </span>
          </div>
        </div>
      )}
      {showedFriend && friends?.map((friend) => <Friend {...friend} />)}
    </div>
  );
};

export default Group;
