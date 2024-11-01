import axios from "../../axios";
const googleSheet = (data) => {
  console.log("gg shet", data);
  return axios
    .post(
      "https://api.sheetbest.com/sheets/247a8cf9-4f51-494c-baac-eabdad76ad69",
      {
        fullName: data.name,
        studentCode: data.studentCode,
        code: data.code,
        location: data.location,
        imageUrl: data.imageUrl,
        submittedTime: data.submittedTime,
      }
    )
    .then((res) => {
      console.log("res sheet", res);
    });
};
export default googleSheet;
