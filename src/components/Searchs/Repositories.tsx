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
  handler: (num: number) => void;
}) => {
  const [repos, setRepos] = useState<IRepo[] | []>([]);
  const { data } = useSearchReposQuery(
    { search: debounced, page },
    {
      skip: debounced.length < 3,
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    if (data) {
      setRepos((arr) => [...arr, ...data]);
    }
  }, [data]);

  return (
    <div>
      {repos?.map((repo) => (
        <RepoCard repo={repo} key={repo.id} />
      ))}
    </div>
  );
};

export default Repositories;
