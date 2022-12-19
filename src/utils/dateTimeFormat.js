import moment from 'moment';

export const timeFormat = (getValue) => {
    let local = new Date((getValue));
    let date = moment(local).fromNow();
    return date;
};

export const currentTime = () => {
    let currentDate = new Date();
    let dateValue = Math.round(currentDate.getTime());
    console.log('22222222', dateValue);
    return dateValue;
};
