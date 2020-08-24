export const add = (array, object) => [...array, object];

export const remove = (array, id) => array.filter((a) => a.id !== id);

export const update = (array, id, changeArray) => {
    const index = array.findIndex((a) => a.id === id);

    if(index === -1) {
        return array;
    }

    return [
        ...array.slice(0, index),
        {...changeArray, id},
        ...array.slice(index + 1),
    ]
}