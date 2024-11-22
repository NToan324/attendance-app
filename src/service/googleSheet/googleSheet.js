import axios from "../../axios";
const googleSheet = (data) => {
  console.log("gg shet", data);
  return axios
    .post(
      "https://api.sheetbest.com/sheets/4798fe80-dbd3-4ea6-a66d-a5978dfafa5e",
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
