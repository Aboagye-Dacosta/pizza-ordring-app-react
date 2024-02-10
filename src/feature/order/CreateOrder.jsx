import { useDispatch, useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import { useState } from 'react';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utilities/helpers';
import EmptyCart from '../cart/EmptyCart';
import { getCart, getTotalCartPrice } from '../cart/cartSlice';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );

function CreateOrder() {
    const [withPriority, setWithPriority] = useState(false);

    const navigation = useNavigation();
    const formErrors = useActionData();
    const {
        username,
        status: addressStatus,
        position,
        address,
        error,
    } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const isSubmitting = navigation.state === 'submitting';
    const cart = useSelector(getCart);
    const totalCartPrice = useSelector(getTotalCartPrice);
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
    const totalPrice = totalCartPrice + priorityPrice;
    const isLoadingAddress = addressStatus === 'loading';

    if (!cart.length) return <EmptyCart />;

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">
                Ready to order? Let&apos;s go!
            </h2>

            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        className="input grow"
                        type="text"
                        name="customer"
                        defaultValue={username}
                        required
                    />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            type="tel"
                            name="phone"
                            required
                        />
                        {formErrors?.phone && (
                            <p className="mt-3 rounded-md bg-red-200 p-2 text-xs text-red-800">
                                {formErrors?.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            className="input w-full"
                            disabled={isLoadingAddress}
                            type="text"
                            name="address"
                            defaultValue={address}
                            required
                        />
                        {addressStatus === 'error' && (
                            <p className="mt-3 rounded-md bg-red-200 p-2 text-xs text-red-800">
                                {error}
                            </p>
                        )}
                    </div>
                    {!position.latitude && !position.longitude && (
                        <span className="absolute right-[3px] top-1">
                            <Button
                                type="small"
                                disabled={isLoadingAddress}
                                handleClick={(e) => {
                                    e.preventDefault();
                                    dispatch(fetchAddress());
                                }}
                            >
                                Get Position
                            </Button>
                        </span>
                    )}
                </div>

                <div className=" mb-12 flex flex-row items-center gap-5">
                    <input
                        type="checkbox"
                        name="priority"
                        id="priority"
                        className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        value={JSON.stringify(cart)}
                        name="cart"
                    />
                    <input
                        type="hidden"
                        value={
                            position.longitude && position.latitude
                                ? `${position.longitude},${position.latitude}`
                                : ''
                        }
                        name="position"
                    />

                    <Button
                        disabled={isSubmitting || isLoadingAddress}
                        type={'primary'}
                    >
                        {isSubmitting ? (
                            'Placing order...'
                        ) : (
                            <span>
                                Order now for
                                <span className="text-red-900 ">
                                    {' '}
                                    {formatCurrency(totalPrice)}
                                </span>
                            </span>
                        )}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const action = (callback) =>
    async function ({ request }) {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        const order = {
            ...data,
            priority: data.priority === 'true',
            cart: JSON.parse(data.cart),
        };

        const error = {};
        if (!isValidPhone(data.phone))
            error.phone =
                'Please provide us with your valid phone number. We might need to call you';

        if (Object.keys(error).length > 0) return error;

        const newOrder = await createOrder(order);
        callback();
        return redirect(`/order/${newOrder.id}`);
    };

export default CreateOrder;
