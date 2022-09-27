import { useEffect, useState } from 'react';
import { IUser } from '../../models/models';
import {
  useLazyGetUserInfoQuery,
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../../store/github/github.api';
import UserCard from '../UserCard';
import UserInfo from '../UserInfo';

const Users = ({
  debounced,
  page,
  handler,
}: {
  debounced: string;
  page: number;
  handler: () => void;
}) => {
  const [activeUser, setActiveUser] = useState('');
  const [users, setUsers] = useState<IUser[] | []>([]);

  const { isLoading, isError, data, isFetching: fetchUsers } = useSearchUsersQuery(
    { search: debounced, page },
    {
      skip: debounced.length < 3,
      refetchOnFocus: true,
    }
  );
  const [fethcUser, { isLoading: areUserLoading, data: userData }] =
    useLazyGetUserInfoQuery();

  const [fetchRepos, { data: repos, isFetching }] =
    useLazyGetUserReposQuery();

  useEffect(() => {
    if (page <= 1) {
      setUsers(data ? [...data] : []);
    } else if (data) {
      const res = users[users.length - 1];
      const dRes = data[9];
      if (res.id !== dRes.id) {
        setUsers((arr) => [...arr, ...data]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, page]);

  const clickHandler = (username: string) => {
    fethcUser(username);
    fetchRepos(username);
    setActiveUser(username);
  };

  return (
    <div className='flex max-h-[80%]'>
      {isError && (
        <p className='text-center text-red-600'> Something went wrong...</p>
      )}
      {isLoading && <p>Loading...</p>}
      <div className='mt-[10px] flex justify-center flex-wrap w-[35%] overflow-y-scroll'>
        {users?.map((user) => (
          <UserCard
            user={user}
            key={user.id}
            clickHandler={clickHandler}
            activeUser={activeUser}
          />
        ))}
        {data && data.length >= 10 && (
          <button
            className={`mb-[50px] border p-2 px-3 border-black ${fetchUsers && 'opacity-30'} `}
            onClick={() => handler()}
            disabled={fetchUsers}
          >
            Загрузить ещё
          </button>
        )}
      </div>
      <div className='w-[65%]'>
        {userData !== undefined && (
          <UserInfo
            user={userData}
            repos={repos ? repos : []}
            fetchRepos={isFetching}
            areUserLoading={areUserLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
