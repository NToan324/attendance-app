import axios from "../../axios";
import endPoints from "../endPoints";

const formSubmit = (data) => {
  return axios.post(endPoints.API.SUBMIT, data);
};

export default formSubmit;
