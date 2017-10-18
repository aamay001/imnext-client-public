import {
    NEXT_STEP
} from '../actions/scheduler.actions';

export const STEP_ONE = 1;
export const STEP_TWO = 2

const initialState = {
    step: STEP_ONE,
    data: {
        firstName: '',
        lastName: '',
        mobilePhone: '',
        providerId: -1,
        date: undefined,
        time: undefined,
        validation: undefined
    }
};

const nextStep = (state, action) => {
    const data = {...state.data};
    data.firstName = action.data.firstName;
    data.lastName = action.data.lastName;
    data.mobilePhone = action.data.mobilePhone;
    return {
        ...state,
        data: data
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NEXT_STEP :
            return nextStep(state, action);
        default:
            return state;
    }
}