import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/order/${query}`);
        setQuery('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="search order #"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                className="w-28 rounded-full bg-yellow-100 px-3 py-2 text-sm transition-[width] duration-200 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
            />
        </form>
    );
}

export default SearchOrder;