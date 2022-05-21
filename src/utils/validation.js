const validateEmail = (input) => {
    if (input.trim() === "") {
        return { code: 400, message: 'Email is a required Field' }
    }
    // eslint-disable-next-line no-useless-escape
    const validationExpression = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const isValid = validationExpression.test(input)
    if (!isValid) return { message: 'Please Enter a valid email', code: 400 };
    else return { code: 200, message: 'Validated Successfully' }
}

export { validateEmail }