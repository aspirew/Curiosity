import { Action, LoginState } from "../types/reducerTypes"
import { AsyncStorageData } from "../utils/enums"

const initialState : LoginState = {
    JWT: ""
}

const loginReducer = (state = initialState, action: Action) => {
    switch(action.type){
        case AsyncStorageData.TOKEN:
            return {...state, JWT: action.payload}
        default:
            return state
    }
}

export default loginReducer