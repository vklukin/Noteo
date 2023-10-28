import { ToastContainer, toast, ToastPosition, Theme } from "react-toastify";

export interface IMessagesProps {
    position?: ToastPosition;
    closeDelay?: number;
    theme?: Theme;
}

const Messages = ({ closeDelay, position, theme }: IMessagesProps) => {
    let _position: ToastPosition = "bottom-right";
    let _closeDelay = 7000;
    let _theme: Theme = "light";

    if (position !== undefined) _position = position;
    if (closeDelay !== undefined) _closeDelay = closeDelay;
    if (theme !== undefined) _theme = theme;

    const MessageContainer = () => {
        return (
            <ToastContainer
                position={_position}
                autoClose={_closeDelay}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={_theme}
            />
        );
    };

    const success = (message: string) => {
        return toast.success(message, {
            position: _position,
            autoClose: _closeDelay,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: _theme
        });
    };

    const error = (message: string) => {
        return toast.error(message, {
            position: _position,
            autoClose: _closeDelay,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: _theme
        });
    };

    const info = (message: string) => {
        return toast.info(message, {
            position: _position,
            autoClose: _closeDelay,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: _theme
        });
    };

    const warning = (message: string) => {
        return toast.warning(message, {
            position: _position,
            autoClose: _closeDelay,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: _theme
        });
    };

    return { MessageContainer, success, error, warning, info };
};

export const Message = (props: IMessagesProps = {}) => Messages(props);
