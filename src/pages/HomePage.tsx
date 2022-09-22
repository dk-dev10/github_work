import React, { useEffect, useState } from 'react';
import {
  useLazyGetUserInfoQuery,
  useSearchUsersQuery,
  useLazyGetUserReposQuery,
} from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import { arr } from '../helpers/data';
import UserCard from '../components/UserCard';
import UserInfo from '../components/UserInfo';
import Sceleton from '../components/Sceleton';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [searchItem, setSearchItem] = useState(arr[0]);
  const [activeUser, setActiveUser] = useState('');
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fethcUser, { isLoading: areUserLoading, data: userData }] =
    useLazyGetUserInfoQuery();

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const clickHandler = (username: string) => {
    fethcUser(username);
    fetchRepos(username);
    setActiveUser(username);
  };

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchItem(e.target.value);
  };

  return (
    <div className='flex flex-col pt-10 mx-auto h-[90vh] w-[90vw]'>
      {isError && (
        <p className='text-center text-red-600'> Something went wrong...</p>
      )}

      <div className='relative w-[560px] flex '>
        <div className='border inline-flex h-[42px] justify-center p-1'>
          <select name='github' id='github' onChange={onSelect}>
            {arr.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <input
          type='text'
          className='border py-2 px-4 w-full h-[42px] mb-2 ml-5'
          placeholder='Github search... '
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='flex max-h-[80%]'>
        <div className='mt-[10px] flex flex-wrap w-[35%] overflow-y-scroll'>
          {data?.map((user) => (
            <UserCard
              user={user}
              key={user.id}
              clickHandler={clickHandler}
              activeUser={activeUser}
            />
          ))}
        </div>
        <div className='w-[65%]'>
          {areUserLoading ? (
            <Sceleton />
          ) : (
            <UserInfo
              user={userData!}
              repos={repos ? repos : []}
              areReposLoading={areReposLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
