import axios from "../../axios";
const googleSheet = (data) => {
  return axios
    .post(
      "https://api.sheetbest.com/sheets/247a8cf9-4f51-494c-baac-eabdad76ad69",
      data
    )
    .then((res) => {
      console.log("res", res);
    });
};
export default googleSheet;
