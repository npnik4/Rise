

export function fireSignIn(uid) {
    return {
        type: 'SIGN_IN', token: uid.toString()
    }
}

export function signOut() {
    return {
        type: 'SIGN_OUT'
    }
}

export function signUp(uid) {
    return {
        type: 'SIGN_IN', token: uid.toString()
    }
}

export function isNewUser(value) {
    return {
        type: 'NEW_USER', value: value
    }
}