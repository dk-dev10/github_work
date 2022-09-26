import { IRepo, IUser } from '../models/models';
import { RepoCard } from './RepoCard';
import Sceleton from './Sceleton';

const UserInfo = ({
  user,
  repos,
  areReposLoading,
  areUserLoading,
}: {
  user: IUser;
  repos: IRepo[];
  areReposLoading: boolean;
  areUserLoading: boolean;
}) => {
  return (
    <div className='flex w-full max-h-[80%] border shadow-lg rounded-xl shadow-stone-300 min-h-[350px] mt-[10px] p-3 overflow-hidden'>
      {!user ? (
        areUserLoading && <Sceleton />
      ) : (
        <>
          <div className='flex flex-col items-center mr-[10px] sticky top-3 max-w-[30%]'>
            <img
              src={user.avatar_url}
              alt='avatar'
              className='w-[200px] rounded-[50%]'
            />
            <p>{user.login}</p>
          </div>
          <div className='max-h-[80%] overflow-y-scroll max-w-[70%]'>
            <h1>Repos</h1>
            {areReposLoading && (
              <p className='text-center '>Repos Loading... </p>
            )}
            {repos?.map((repo) => (
              <RepoCard repo={repo} key={repo.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
