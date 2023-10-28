import React from "react";

import { IInputState } from "../../../core/types/inputs";
import { Validation } from "../../../core/utils/Validation";

type FormOfCreationValid = (
    heading: {
        heading: IInputState;
        setHeading: React.Dispatch<React.SetStateAction<IInputState>>;
    },
    textarea: {
        textarea: IInputState;
        setTextarea: React.Dispatch<React.SetStateAction<IInputState>>;
    }
) => boolean;

const { isTextEmpty } = Validation;

export const isFormOfCreationValid: FormOfCreationValid = (
    { heading, setHeading },
    { textarea, setTextarea }
) => {
    if (isTextEmpty(heading.value)) {
        setHeading((prev) => ({
            ...prev,
            errorText: "Поле не должно быть пустым"
        }));
        return false;
    }

    if (isTextEmpty(textarea.value)) {
        setTextarea((prev) => ({
            ...prev,
            errorText: "Поле не должно быть пустым"
        }));
        return false;
    }

    return true;
};
