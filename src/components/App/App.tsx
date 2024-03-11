import { useEffect } from 'react';

import './App.css';
import { getGroups } from '../../features/groups/groupsSlice';
import { useAppDispatch } from '../../hooks/hooks';
import Home from '../Home/Home';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  return (
    <div className='app'>
      <Home />
    </div>
  );
}

export default App;
