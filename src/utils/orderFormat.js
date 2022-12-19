import _ from 'lodash';

export const orderByFun = (tempArray) => {
    const temp = _.orderBy(tempArray, ['createdAt'], ['desc']);
    return temp;
};

//list the questions in ascendenting and descending
export const orderByResponse = (tempArray, field, order) => {
    const temp = _.orderBy(tempArray, [field], [order]);
    return temp;
};
