import { useSelector } from 'react-redux';

function Username() {
    const username = useSelector((state) => state.user.username);
    if (!username) return null;
    return <div className="hidden md:block uppercase font-bold bg-yellow-200 rounded-full px-5 py-1 text-yellow-900">{username}</div>;
}

export default Username;
