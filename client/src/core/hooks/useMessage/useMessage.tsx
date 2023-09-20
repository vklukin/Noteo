import { ToastContainer, toast, ToastPosition, Theme } from "react-toastify"

export interface IMessagesProps {
    position?: ToastPosition
    closeDelay?: number
    theme?: Theme
}

class Messages {
    private _position: ToastPosition = "bottom-right"
    private _closeDelay = 7000
    private _theme: Theme = "light"

    constructor(props: IMessagesProps) {
        const { closeDelay, position, theme } = props

        if (position !== undefined) this._position = position
        if (closeDelay !== undefined) this._closeDelay = closeDelay
        if (theme !== undefined) this._theme = theme
    }

    MessageContainer = () => {
        return (
            <ToastContainer
                position={this._position}
                autoClose={this._closeDelay}
                theme={this._theme}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />
        )
    }

    success(message: string) {
        return toast.success(message, {
            position: this._position,
            autoClose: this._closeDelay,
            theme: this._theme,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
        })
    }

    error(message: string) {
        return toast.error(message, {
            position: this._position,
            autoClose: this._closeDelay,
            theme: this._theme,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
        })
    }

    info(message: string) {
        return toast.info(message, {
            position: this._position,
            autoClose: this._closeDelay,
            theme: this._theme,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
        })
    }

    warning(message: string) {
        return toast.warning(message, {
            position: this._position,
            autoClose: this._closeDelay,
            theme: this._theme,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
        })
    }
}

export const useMessage = (props: IMessagesProps = {}) => new Messages(props)
