import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import { AsyncStorage } from "react-native";
import { AsyncStorageData } from "../utils/enums";

type Error = {
    code: number,
    message: string
}

export async function getLocalToken(): Promise<string | undefined>{
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
        const token = await auth.currentUser?.getIdToken(true)
        if(token)
            setLocalToken(token)
        return token
    } catch(err: any){
        const error = err as Error
        console.error(error.message)
        return undefined
    }
}

export async function firebaseRegister(email: string, pass: string): Promise<string | undefined>{
    try {
        await createUserWithEmailAndPassword(auth, email, pass)
        const token = await auth.currentUser?.getIdToken(true)
        if(token)
            setLocalToken(token)
        return token
    } catch(err: any){
        const error = err as Error
        console.error(error.message)
        return undefined
    }
}