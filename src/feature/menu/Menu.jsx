import { useLoaderData } from 'react-router-dom';

import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
    const data = useLoaderData();
    return (
        <ul className="divide-y divide-stone-300 px-4">
            {data.map((pizza) => (
                <MenuItem key={pizza.id} pizza={pizza} />
            ))}
        </ul>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
    const data = await getMenu();
    return data;
};

export default Menu;
