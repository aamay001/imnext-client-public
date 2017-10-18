export const NEXT_STEP = 'NEXT_STEP';
export const nextStep = data => {
    return {
        type: NEXT_STEP,
        data
    };
}