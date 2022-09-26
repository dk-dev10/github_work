import React, { useState } from 'react';
import { useDebounce } from '../hooks/debounce';
import { arr } from '../helpers/data';
import Users from '../components/Searchs/Users';
import Repositories from '../components/Searchs/Repositories';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [searchItem, setSearchItem] = useState(arr[0]);
  const debounced = useDebounce(search);

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(0);
    setSearchItem(e.target.value);
  };

  const addItems = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className='flex flex-col pt-10 mx-auto h-[90vh] w-[90vw]'>
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
      {searchItem === 'username' ? (
        <Users debounced={debounced} page={page} handler={addItems} />
      ) : (
        <Repositories debounced={debounced} page={page} handler={addItems} />
      )}
    </div>
  );
}
