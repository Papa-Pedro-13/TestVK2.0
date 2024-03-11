import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { filteredList } from '../../features/groups/groupsSlice';
import { FILTER_CLOSE } from '../../utils/constants';

const Filters = () => {
  const dispatch = useAppDispatch();

  const [filterClosed, setFilterClosed] = useState(FILTER_CLOSE.ANY);
  const [filterAvatar, setFilterAvatar] = useState('any');
  const [filterFriends, setFilterFriends] = useState('any');
  const [avatarColors, setAvatarColors] = useState<string[]>([]);

  const {
    groups: { list },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (!list?.length) return;

    dispatch(
      filteredList({
        close: filterClosed,
        avatar: filterAvatar,
        friends: filterFriends,
      })
    );
  }, [dispatch, list?.length, filterClosed, filterAvatar, filterFriends]);

  useEffect(() => {
    const unique = new Set<string>([]);
    const newColors: string[] = [];
    list?.forEach((item) => {
      if (item.avatar_color !== undefined) {
        unique.add(item.avatar_color);
      }
    });
    for (const value of unique) {
      newColors.push(value);
    }
    console.log(newColors);
    setAvatarColors([...newColors]);
  }, [list]);

  return (
    <div className='filters'>
      <div className='filters__item'>
        Сортировка по открытости
        <select
          name=''
          id=''
          onChange={(e) => {
            setFilterClosed(e.target.value);
          }}
        >
          <option value={FILTER_CLOSE.ANY}>Все</option>
          <option value={FILTER_CLOSE.OPEN}>Открытая</option>
          <option value={FILTER_CLOSE.CLOSE}>Закрытая</option>
        </select>
      </div>
      <div className='filters__item'>
        Сортировка по цвету аватара
        <select
          name=''
          id=''
          onChange={(e) => {
            setFilterAvatar(e.target.value);
          }}
        >
          <option value={'any'}>Все</option>
          {avatarColors.map(
            (item, index) =>
              item && (
                <option
                  value={item}
                  key={index}
                >
                  {item}
                </option>
              )
          )}
        </select>
      </div>
      <div className='filters__item'>
        Сортировка по наличию друзей
        <select
          name=''
          id=''
          onChange={(e) => {
            setFilterFriends(e.target.value);
          }}
        >
          <option value={'any'}>Все</option>
          <option value={'true'}>Есть</option>
          <option value={''}>Отсутствуют</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
