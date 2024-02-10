import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

function UpdateOrder() {
    const fetcher = useFetcher();
    console.log(fetcher.state);
    return (
        <fetcher.Form method="PATCH" className="text-right">
            <Button type="primary">
                {fetcher.state == 'submitting'
                    ? 'submitting ...'
                    : 'Make Priority'}
            </Button>
        </fetcher.Form>
    );
}

export default UpdateOrder;

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params }) {
    const data = { priority: true };
    await updateOrder(params.orderId, data);

    return null;
}
