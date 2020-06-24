import { fireSignIn } from '../actions/login'
import AsyncStorage from '@react-native-community/async-storage';

export async function signIn() {
    try {
        await AsyncStorage.setItem('userToken', 'dummy-auth-token')
        this.props.store.dispatch(fireSignIn());
    } catch (e) {
        console.log(e)
    }
}