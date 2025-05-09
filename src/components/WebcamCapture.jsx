import { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

// Define styled components for styling
const WebcamContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
`

const WebcamVideo = styled.video`
  width: 100%;
  border-radius: 10px;
  @media (max-width: 767px) {
    height: auto;
    object-fit: cover;
    border-radius: 0;
  }
`

const PreviewImg = styled.img`
  width: 100%;
  border-radius: 10px;
  @media (max-width: 767px) {
    height: auto;
    object-fit: cover;
    border-radius: 0;
  }
`

const WebcamCanvas = styled.canvas`
  display: none; /* Hide canvas by default */
`

const WebcamButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  color: #333;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size:20px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

// const base64ToFile = (base64, fileName, mimeType) => {
//   const byteCharacters = atob(base64.split(',')[1]);
//   const byteNumbers = new Array(byteCharacters.length);
//   for (let i = 0; i < byteCharacters.length; i++) {
//     byteNumbers[i] = byteCharacters.charCodeAt(i);
//   }
//   const byteArray = new Uint8Array(byteNumbers);

//   return new File([byteArray], fileName, { type: mimeType });
// };

const WebcamCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    startWebcam();
  }, []);

  useEffect(() => {
    if (capturedImage) {
      localStorage.setItem('cardIdImage', capturedImage);  // บันทึก imageDataUrl ใน localStorage
      console.log("Saved image to localStorage:", capturedImage);

      // ส่งค่า capturedImage กลับไปให้ parent component เพื่ออัพเดทสถานะ
      if (onCapture) {
        onCapture(capturedImage);  // ส่งภาพที่ capture กลับไป
      }
    } else {
      if (onCapture) {
        onCapture(null);  // หากไม่มีภาพให้ส่งค่า null กลับไป
      }
    }
  }, [capturedImage, onCapture]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user" // Request the front camera (selfie camera)
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMediaStream(stream);
    } catch (error) {
      console.error("Error accessing webcam", error);
    }
  };

  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL("image/jpeg");

        setCapturedImage(imageDataUrl);
        console.log("type cardIdImageUrl webcam: ", typeof(imageDataUrl));
        console.log("cardIdImageUrl webcam: ", imageDataUrl);

        stopWebcam();
      }
    }
  };

  const resetState = () => {
    stopWebcam();
    setCapturedImage(null);  // Reset capturedImage
    startWebcam();
  };

  return (
    <WebcamContainer>
      {capturedImage ? (
        <>
          <PreviewImg src={capturedImage} className="captured-image" />
          <WebcamButton style={{ backgroundColor: "red", color: "white", width: '83.333333%' }} onClick={resetState}>รีเซ็ตรูป</WebcamButton>
        </>
      ) : (
        <>
          <div className="w-full h-auto bg-white md:w-full md:h-auto lg:w-full lg-h-auto">
            <WebcamVideo ref={videoRef} autoPlay muted />
            <WebcamCanvas ref={canvasRef} />
            <WebcamButton style={{ backgroundColor: "#026D44", color: "white", width: '83.333333%' }} onClick={captureImage}>ถ่ายรูป</WebcamButton>
          </div>
        </>
      )}
    </WebcamContainer>
  );
};
WebcamCapture.propTypes = {
  onCapture: PropTypes.func.isRequired,
};

export default WebcamCapture;
