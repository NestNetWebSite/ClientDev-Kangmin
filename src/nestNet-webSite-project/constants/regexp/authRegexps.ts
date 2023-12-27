export const emailRegexp: RegExp =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))/;
export const idRegexp: RegExp = /^(?=.*[a-zA-Z])(?=.*\d).{8,20}$/;
export const passwordRegexp: RegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[\d]).{8,20}$/;
