import { z } from "zod";

export const validate = <T, S extends z.ZodRawShape>(
    schema: z.ZodObject<S> | z.ZodEffects<z.ZodObject<S>>,
    data: T
) => {
    const result = schema.safeParse(data);
    const errors = !result.success ? result.error.format() : undefined;

    return {
        success: result.success,
        errors: errors,
    };
};

export const createValidator = <S extends z.ZodRawShape>(
    schema: z.ZodObject<S> | z.ZodEffects<z.ZodObject<S>>
) => {
    return <T>(data: T) => validate(schema, data);
};
