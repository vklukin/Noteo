import { IInputState } from "../../../../core/types/inputs"
import { Validation } from "../../../../core/utils/Validation"

type IIsRegistrationValidProps = (
    email: {
        email: IInputState
        setEmail: React.Dispatch<React.SetStateAction<IInputState>>
    },
    firstPassword: {
        firstPassword: IInputState
        setFirstPassword: React.Dispatch<React.SetStateAction<IInputState>>
    },
    secondPassword: {
        secondPassword: IInputState
        setSecondPassword: React.Dispatch<React.SetStateAction<IInputState>>
    }
) => boolean

const { checkTextLength, isTextEmpty } = Validation

export const isRegistrationValid: IIsRegistrationValidProps = (
    { email, setEmail },
    { firstPassword, setFirstPassword },
    { secondPassword, setSecondPassword }
) => {
    if (isTextEmpty(email.value)) {
        setEmail((prev) => ({ ...prev, errorText: "Поле почты не должно быть пустое" }))
        return false
    }

    if (isTextEmpty(firstPassword.value)) {
        setFirstPassword((prev) => ({ ...prev, errorText: "Поле пароля не должно быть пустое" }))
        return false
    }

    if (isTextEmpty(secondPassword.value)) {
        setSecondPassword((prev) => ({
            ...prev,
            errorText: "Поле повтора пароля не должно быть пустое"
        }))
        return false
    }

    if (checkTextLength(firstPassword.value, 7)) {
        setFirstPassword((prev) => ({
            ...prev,
            errorText: "Пароль должен быть не менее 7 символов"
        }))
        return false
    }

    if (checkTextLength(secondPassword.value, 7)) {
        setSecondPassword((prev) => ({
            ...prev,
            errorText: "Пароль должен быть не менее 7 символов"
        }))
        return false
    }

    if (firstPassword.value !== secondPassword.value) {
        setSecondPassword((prev) => ({
            ...prev,
            errorText: "Пароли не совпадают"
        }))

        return false
    }

    return true
}
