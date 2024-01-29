export interface ErrorBody extends Error {
    code: string;
}
const codeError = {
    NOT_FOUND: '000-',
    IS_EXISTED: '001-',
    NOT_MATCH: '002-',
    NOT_ALLOWED: '003-',
    UNKNOWN: '004-',
    SERVER_ERROR: '005-',
};

export const errorMessages = {
    auth: {
        notAllowed: {
            message: 'No access!',
            code: codeError.NOT_ALLOWED + 'NO-ACCESS',
        },
        decodeTokenFailed: {
            message: 'Decode token failed!',
            code: codeError.SERVER_ERROR + 'DECODE-TOKEN-FAILED',
        },
    },
    category: {
        notFound: {
            message: 'Category not found!',
            code: codeError.NOT_FOUND + 'CATEGORY-NOT-FOUND',
        },
    },
    kind: {
        notFound: {
            message: 'Kind not found!',
            code: codeError.NOT_FOUND + 'KIND-NOT-FOUND',
        },
    },
    product: {
        notFound: {
            message: 'Product not found!',
            code: codeError.NOT_FOUND + 'PRODUCT-NOT-FOUND',
        },
    },
    user: {
        wrongCredentials: {
            message: 'Username or password is not correct!',
            code: codeError.NOT_FOUND + 'USERNAME-OR-PASSWORD-NOT-CORRECT',
        },
        emailAlreadyExist: {
            message: 'Email is being used!',
            code: codeError.IS_EXISTED + 'EMAIL-IS-EXISTED',
        },
        phoneAlreadyExist: {
            message: 'Phone is being used!',
            code: codeError.IS_EXISTED + 'PHONE-IS-EXISTED',
        },
        passwordConfirmNotMatch: {
            message: 'Password confirm is not match!',
            code: codeError.NOT_MATCH + 'PASSWORD-CONFIRM-NOT-MATCH',
        },
    },
    global: {
        internalError: {
            message: 'Something went wrong',
            code: codeError.UNKNOWN + 'UNKNOWN-ERROR',
        },
    },
};
