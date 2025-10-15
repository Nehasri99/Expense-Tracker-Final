import { toast } from 'react-toastify';

export const handleSuccess = (message) => {
    toast.success(message, {
        position: 'top-right',
        colour: 'green'
    });
};

export const handleError = (message) => {
    toast.error(message, {
        position: 'top-right',
        colour: 'red'
    });
};