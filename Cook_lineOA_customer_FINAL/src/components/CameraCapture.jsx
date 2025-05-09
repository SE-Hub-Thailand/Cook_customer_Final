import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CameraContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
`;

const CapturedImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const ActionButton = styled.button`
  background-color: #026D44;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #02563a;
  }
`;

const CameraCapture = ({ onImageCaptured, initialImage, id }) => {
  const videoElementRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [capturedImageData, setCapturedImageData] = useState(initialImage || null);
  const [cameraMode, setCameraMode] = useState("user");

  useEffect(() => {
    if (!capturedImageData) initializeCamera();

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraMode, capturedImageData]);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraMode }
      });
      setCameraStream(stream);
      if (videoElementRef.current) {
        videoElementRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("ไม่สามารถเปิดกล้องได้ โปรดตรวจสอบการอนุญาต");
    }
  };

  const capturePhoto = () => {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (videoElementRef.current && context) {
        canvas.width = videoElementRef.current.videoWidth;
        canvas.height = videoElementRef.current.videoHeight;
        context.drawImage(videoElementRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL("image/jpeg");
        setCapturedImageData(imageDataUrl);
        if (onImageCaptured) onImageCaptured(id, imageDataUrl);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
      alert("เกิดข้อผิดพลาดในการถ่ายรูป");
    }
  };

  const switchCameraMode = () => {
    setCameraMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedImageData(reader.result);
        if (onImageCaptured) onImageCaptured(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        alert("เกิดข้อผิดพลาดในการอ่านไฟล์รูปภาพ");
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setCapturedImageData(null);
    initializeCamera();
  };

  return (
    <CameraContainer>
      {capturedImageData ? (
        <>
          <CapturedImage src={capturedImageData} alt="Captured" />
          <div className="flex justify-center mt-4 space-x-2">
            <ActionButton onClick={resetImage} style={{ backgroundColor: "red" }}>
              รีเซ็ตรูป
            </ActionButton>
          </div>
        </>
      ) : (
        <video ref={videoElementRef} autoPlay playsInline style={{ width: "100%" }} />
      )}
      <div className="flex justify-center mt-4 space-x-2">
        {!capturedImageData && (
          <ActionButton onClick={switchCameraMode}>สลับกล้อง</ActionButton>
        )}
        <ActionButton onClick={capturePhoto} disabled={!!capturedImageData}>
          ถ่ายรูป
        </ActionButton>
        <ActionButton as="label" htmlFor="file-input">
          เลือกไฟล์
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="file-input"
            style={{ display: "none" }}
          />
        </ActionButton>
      </div>
    </CameraContainer>
  );
};

CameraCapture.propTypes = {
  onImageCaptured: PropTypes.func.isRequired,
  initialImage: PropTypes.string,
};

export default CameraCapture;
