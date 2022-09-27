import { useEffect, useState } from 'react';
import { IRepo } from '../../models/models';
import { useSearchReposQuery } from '../../store/github/github.api';
import { RepoCard } from '../RepoCard';

const Repositories = ({
  debounced,
  page,
  handler,
}: {
  debounced: string;
  page: number;
  handler: () => void;
}) => {
  const [repos, setRepos] = useState<IRepo[] | []>([]);
  const { data, isLoading, isFetching } = useSearchReposQuery(
    { search: debounced, page },
    {
      skip: debounced.length < 3,
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    if (page <= 1) {
      setRepos(data ? [...data] : []);
    } else if (data) {
      const res = repos[repos.length - 1];
      const dRes = data[9];
      if (res.id !== dRes.id) {
        setRepos((arr) => [...arr, ...data]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, page]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}

      {repos?.map((repo) => (
        <RepoCard repo={repo} key={repo.id} />
      ))}
      <div className='flex justify-center w-full'>
        {data && data.length >= 10 && (
          <button
            className={`mb-[50px] border p-2 px-3 border-black ${isFetching && 'opacity-30'}`}
            onClick={() => handler()}
            disabled={isFetching}
          >
            Загрузить ещё
          </button>
        )}
      </div>
    </div>
  );
};

export default Repositories;
