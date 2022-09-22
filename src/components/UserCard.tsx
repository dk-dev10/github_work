import { IUser } from '../models/models';

const UserCard = ({
  user,
  clickHandler,
  activeUser,
}: {
  user: IUser;
  clickHandler: (login: string) => void;
  activeUser: string;
}) => {
  return (
    <div
      className={`flex justify-start items-center border  mb-5 mr-5 shadow-lg shadow-stone-300 p-3 rounded-[10px] w-full cursor-pointer max-h-[60px] ${
        activeUser === user.login && 'opacity-50'
      }`}
      onClick={() => clickHandler(user.login)}
    >
      <img
        src={user.avatar_url}
        alt='avatar'
        className='w-[35px] rounded-[50%] mr-3 '
      />
      <p>{user.login}</p>
    </div>
  );
};

export default UserCard;
