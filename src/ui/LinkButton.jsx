import { Link, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function LinkButton({ to, children }) {
    const navigate = useNavigate();
    if (to === '-1')
        return (
            <button
                className="text-sm text-blue-400 hover:text-blue-600 md:text-base"
                onClick={() => navigate(-1)}
            >
                {children}
            </button>
        );
    return (
        <Link
            to={to}
            className="text-sm text-blue-400 hover:text-blue-600 md:text-base"
        >
            {children}
        </Link>
    );
}

export default LinkButton;
