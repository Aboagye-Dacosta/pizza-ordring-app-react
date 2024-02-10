import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Button({ children, disabled, handleClick, to, type }) {
    const className =
        'transition-color uppercase  inline-block rounded-full bg-yellow-500 px-4 py-3 font-semibold tracking-wider duration-200 hover:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4';

    const base =
        'transition-color text-sm uppercase inline-block rounded-full bg-yellow-500 font-semibold tracking-wider duration-200 hover:bg-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 disabled:cursor-not-allowed ';
    const styles = {
        primary: base + ' px-4 py-3 sm:px-6 sm:py-4',
        small: base + ' px-3 py-2 sm:px-4 sm:py-2 text-xm',

        secondary:
            'transition-color uppercase text-sm inline-block rounded-full  px-4 py-2.5 hover:text-stone-800 font-semibold border-2 border-stone-300 tracking-wider duration-200 hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-3.5',
        round: base + "px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm font-semibold"
    };

    if (to)
        return (
            <Link className={className} to={to}>
                {children}
            </Link>
        );
    return (
        <button
            className={styles[type]}
            disabled={disabled}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}

export default Button;
