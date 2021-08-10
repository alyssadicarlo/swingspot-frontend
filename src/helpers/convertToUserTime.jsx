const convertToUserTime = (time) => {
    const timezoneOffset = (new Date()).getTimezoneOffset();

    const hours = -(timezoneOffset / 60);

    time.setHours(time.getHours() + hours);
    return time;
}

export default convertToUserTime;