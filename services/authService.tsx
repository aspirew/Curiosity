import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import { AsyncStorage } from "react-native";
import { AsyncStorageData } from "../utils/enums";
import Toast from 'react-native-root-toast';
import { addUser } from "./dbService";

type Error = {
    code: number,
    message: string
}

export async function getLoggedInUserUID(): Promise<string | undefined>{
    const token = await AsyncStorage.getItem(AsyncStorageData.TOKEN)
    return token ? token : undefined
}

export async function setLocalToken(token: string): Promise<void>{
    await AsyncStorage.setItem(AsyncStorageData.TOKEN, token)
}

export function firebaseLogout(){
    auth.signOut().then(() => {
        AsyncStorage.removeItem(AsyncStorageData.TOKEN)
    })
}

export async function firebaseLogin(email: string, pass: string): Promise<string | undefined>{
    try {
        await signInWithEmailAndPassword(auth, email, pass)
        const uid = auth.currentUser?.uid
        if(uid)
            setLocalToken(uid)
        return uid
    } catch(err: any){
        const error = err as Error
        Toast.show(error.message, {
            duration: Toast.durations.LONG,
        });
        console.error(error.message)
        return undefined
    }
}

export async function firebaseRegister(email: string, pass: string, nick: string): Promise<string | undefined>{
    try {
        await createUserWithEmailAndPassword(auth, email, pass)
        const user = auth.currentUser
        if(user){
            addUser({
                uid: user.uid,
                mail: email,
                nick: nick,
                createdAt: (new Date()).getTime(),
            })
            setLocalToken(user.uid)
        }
        return user?.uid
    } catch(err: any){
        const error = err as Error
        console.error(error.message)
        return undefined
    }
}
