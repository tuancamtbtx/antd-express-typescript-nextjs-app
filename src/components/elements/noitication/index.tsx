
import { notification } from 'antd'
interface INotiProps {
    message: string,
    description?: string
    callback?: () => void,
    type: 'success' | 'info' | 'warning' | 'error'
}
const Notification = ({ message, description, type, callback }: INotiProps) => {
    notification.open({
        type: type,
        message: message,
        description: description,
        onClick: () => callback,
    });
};
export default Notification