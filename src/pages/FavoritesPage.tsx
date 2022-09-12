import React from 'react';
import { useAppSelector } from '../hooks/redux';

export default function Favourite() {
  const { favourites } = useAppSelector((state) => state.github);

  if (favourites.length === 0) return <p className='text-center'>No items.</p>;

  return (
    <div className='container flex justify-center my-10'>
      <ul className='list-none'>
        {favourites.map((item) => (
          <li key={`${item}`} className='my-2'>
            <a href={item}>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
