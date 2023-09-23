import * as yup from "yup";

// As seguintes restrições foram incluidas apenas a titulo de demonstração,
// os critérios exatos ainda serão definidos junto a equipe.
const MIN_USERNAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 16;

export const loginValidationSchema = yup.object().shape({
    username: yup
        .string()
        .min(MIN_USERNAME_LENGTH, `Usuário deve ter no mínimo ${MIN_USERNAME_LENGTH} caracteres.`)
        .required("Usuário é obrigatório."),
    password: yup
        .string()
        // .min(MIN_PASSWORD_LENGTH, `Senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres.`)
        // .max(MAX_PASSWORD_LENGTH, `Senha deve ter no máximo ${MAX_PASSWORD_LENGTH} caracteres.`)
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        //     "Senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial."
        // )
        .required("Senha é obrigatória.")
})