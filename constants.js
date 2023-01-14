"use strict";
/* eslint-disable */

export default {
  PASS_INT : 1,
  PASS_MAX : 50,
  PASS_MIN : 8,

  ALERT_EMPTY: "Fill in the empty field",
  ALERT_URL : " is not a valid url",
  ALERT_EMAIL : " is not a valid email",
  ALERT_PASS : `Your Password must have 8 characters minimum, 50 characters maximum, with uppercase & lowercase, 1 number minimum & no space.`,

  API_URL : "http://localhost:3000",
  CONTENT_TYPE : "multipart/form-data", 
  TOKEN : JSON.parse(localStorage.getItem("userToken")),
  USER_ID : JSON.parse(localStorage.getItem("userId"))
}
