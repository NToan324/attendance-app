import React, { useEffect, useState } from "react";
import "rsuite/dist/rsuite.min.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

import Location from "./location";
import Camera from "./camera";
import formService from "../../service/form/formService";
import { imageDb } from "../../service/firebase/config";
import { list } from "../../components/Loader/generic";

import { Form, ButtonToolbar, Button } from "rsuite";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function FormScreen() {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [infoUser, setInfoUser] = useState({
    fullName: "",
    studentCode: "",
    code: "",
    location: [],
  });
  const navigate = useNavigate();

  const handleOpen = () => {
    setShowCamera(true);
  };

  const handleUploadImageFirebase = async () => {
    try {
      const imgRef = ref(imageDb, `image/${v4()}`);
      if (imageUrl) {
        await uploadBytes(imgRef, imageUrl);
        const result = await getDownloadURL(imgRef);
        return {
          ...infoUser,
          imageUrl: result,
        };
      }
      return {
        ...infoUser,
        imageUrl: "",
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  const getDataFromInput = (_, e) => {
    const { name, value } = e.target;
    setInfoUser({
      ...infoUser,
      [name]: value,
    });
  };

  const checkIsEmty = () => {
    const listKey = [
      { key: "fullName", value: "Họ và tên" },
      { key: "studentCode", value: "Mã số sinh viên" },
      { key: "code", value: "Mã điểm danh" },
      { key: "location", value: "Vị trí" },
    ];
    for (const key in infoUser) {
      if (key === "location" && infoUser[key].length === 0) {
        toast.error("Vui lòng bật vị trí trước khi gửi");
        return true;
      }
      if (!infoUser[key]) {
        toast.error(
          `${listKey.find((item) => item.key === key).value} đang được bỏ trống`
        );
        return true;
      }
    }
    return false;
  };

  const hanldeSubmit = async () => {
    try {
      const updateInfo = await handleUploadImageFirebase();
      const isEmty = checkIsEmty();
      if (!isEmty) {
        if (updateInfo.imageUrl === "") {
          toast.error("Vui lòng chụp hình trước khi gửi");
          return;
        }
        setLoading(true);
        const result = await formService(updateInfo);
        if (result.data.errCode === 0) {
          navigate("/form-sucess");
        } else toast.error("Điểm danh thất bại");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const getUrlImageFromCamera = async (url) => {
    setImageUrl(url);
  };

  const getLocationData = async (location) => {
    setInfoUser({
      ...infoUser,
      location: [location.latitude, location.longitude],
    });
  };

  useEffect(() => {
    async function checkPermissionCamera() {
      try {
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraPermission(true);
      } catch (error) {
        setCameraPermission(false);
      }
    }
    checkPermissionCamera();
  }, []);

  return (
    <div className="bg-white p-10 w-1/2 min-w-96 h-fit my-10">
      <div className="title border-b pb-10 custom-border-color">
        <h3>Điểm danh sinh viên</h3>
        <p className="text-base">
          Các bạn vui lòng cho phép truy cập máy ảnh và vị trí!
        </p>
      </div>
      <Form className="mt-5 text-base flex flex-col gap-5 justify-start content-center">
        <Form.Group controlId="name">
          <Form.ControlLabel>Họ và tên</Form.ControlLabel>
          <Form.Control
            name="fullName"
            value={infoUser.fullName || ""}
            onChange={(_, e) => getDataFromInput(_, e)}
          />
          <Form.HelpText>Đây là thông tin bắt buộc</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="studentCode">
          <Form.ControlLabel>Mã số sinh viên</Form.ControlLabel>
          <Form.Control
            name="studentCode"
            value={infoUser.studentCode || ""}
            onChange={(_, e) => getDataFromInput(_, e)}
          />
          <Form.HelpText tooltip>Đây là thông tin bắt buộc</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="code">
          <Form.ControlLabel>Mã điểm danh</Form.ControlLabel>
          <Form.Control
            name="code"
            value={infoUser.code || ""}
            onChange={(_, e) => getDataFromInput(_, e)}
          />
          <Form.HelpText tooltip>Đây là thông tin bắt buộc</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="camera">
          <Form.ControlLabel>Chụp hình</Form.ControlLabel>
          {showCamera && cameraPermission ?
            <Camera data={getUrlImageFromCamera} />
          : <Button
              appearance="primary"
              color="green"
              onClick={() => handleOpen()}
            >
              <CameraAltIcon />
              &nbsp; Chụp ngay
            </Button>
          }
          <Form.HelpText tooltip>Đây là thông tin bắt buộc</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="Location">
          <Form.ControlLabel>Vị trí</Form.ControlLabel>
          <Location data={getLocationData} />
        </Form.Group>
        <Form.Group className="flex justify-center flex-wrap content-center border-t mt-5 p-10 custom-border-color">
          {!loading ?
            <ButtonToolbar>
              <Button
                size="lg"
                style={{
                  backgroundColor: "#18bd5b",
                  color: "white",
                  width: "140px",
                  padding: "10px 15px",
                }}
                onClick={() => hanldeSubmit()}
              >
                Gửi
              </Button>
            </ButtonToolbar>
          : <ReactLoading
              type={list.prop}
              color="#000"
              height={50}
              width={50}
            />
          }
        </Form.Group>
      </Form>
    </div>
  );
}
