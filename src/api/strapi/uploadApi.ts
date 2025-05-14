// src/api/strapi/uploadApi.ts
import { Image } from './types';
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:1400';  // Fallback to default if env variable not set

// ฟังก์ชันอัปโหลดเดิมที่ปรับแก้เล็กน้อย
export const uploadImage = async (imageFile: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const url = `${API_URL}/api/upload`;

    const formData = new FormData();
    formData.append("files", imageFile); // 'files' เป็น key ที่ Strapi คาดหวัง
    console.log('formData uploadApi', formData);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            reject(errorData);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('data uploadApi', data);
        resolve(data[0]); // สมมติว่าข้อมูลรูปภาพที่อัปโหลดอยู่ใน data[0]
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const uploadImageFromUrl = async (imageUrl: string): Promise<any> => {
  try {
    // 1. ดาวน์โหลดรูปภาพจาก URL
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // 2. แปลง Blob เป็นไฟล์ (File)
    const fileName = imageUrl.split('/').pop() || "image.jpg"; // ใช้ชื่อจาก URL หรือใช้ 'image.jpg' ถ้าไม่มี
    const file = new File([blob], fileName, { type: blob.type });

    // 3. อัปโหลดไฟล์ที่แปลงจาก URL โดยใช้ฟังก์ชัน uploadImage
    const uploadedImage = await uploadImage(file);
    return uploadedImage;
    // return file;

  } catch (error) {
    console.error("Error uploading image from URL:", error);
    throw error; // Propagate the error
  }
};

export const uploadImageFromBase64 = async (base64Image: string): Promise<any> => {
  try {
    if (!base64Image.includes("data:image")) {
      throw new Error("Invalid Base64 string. Must be an image.");
    }
    // 1. แปลง Base64 ให้เป็น Blob (หรือ File)
    const mimeType = base64Image.match(/data:([^;]+);base64,/)[1]; // ดึง MIME type จาก Base64 string
    const byteCharacters = atob(base64Image.split(',')[1]); // แปลง Base64 เป็น binary data
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // 2. แปลง Blob เป็น File
    const fileName = `image_${Date.now()}.jpg`; // สร้างชื่อไฟล์อัตโนมัติ
    const file = new File([byteArray], fileName, { type: mimeType });

    // 3. อัปโหลดไฟล์ที่แปลงจาก Base64 โดยใช้ฟังก์ชัน uploadImage
    const uploadedImage = await uploadImage(file);
    return uploadedImage;

  } catch (error) {
    console.error("Error uploading image from Base64:", error);
    throw error; // Propagate the error
  }
};


export const getUploadById = async (id: string, token: string): Promise<any> => {
  if (!token) {
      throw new Error('No token provided. User must be authenticated.');
  }
  if (!id) {
      throw new Error('No file ID provided.');
  }

  try {
      // กำหนดเส้นทาง URL สำหรับดึงไฟล์ตาม ID ที่ระบุ
      const url = `${API_URL}/api/upload/files/${id}`;

      // ทำการ request โดยใส่ token ใน headers
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      // ตรวจสอบว่าการ request สำเร็จหรือไม่
      if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching upload file:', errorData);
          throw new Error(`Request failed with status ${response.status}`);
      }

      // รับข้อมูลจาก response
      const data = await response.json();
      console.log('data', data);

      // return ข้อมูลไฟล์ที่ได้รับ
      return data;
  } catch (error) {
      console.error('Error fetching upload file by ID:', error.message);
      throw error;
  }
};

// ฟังก์ชันสำหรับจัดการอัปโหลดรูปภาพหรือจาก URL
export const handlePhotoUpload = async (photoImage: string | File): Promise<{ url: string, id: number }> => {
  let uploadedImageObject;

  // กรณี photoImage เป็น URL (string)
  if (typeof photoImage === "string") {
    uploadedImageObject = await uploadImageFromUrl(photoImage); // อัปโหลดจาก URL
  }

  // กรณี photoImage เป็นไฟล์ (object)
  if (typeof photoImage === "object") {
    uploadedImageObject = await uploadImage(photoImage); // อัปโหลดจากไฟล์
  }

  // สร้าง URL และคืนค่า
  const url = uploadedImageObject.url ? `${API_URL}${uploadedImageObject.url}` : '';;
  const fileId = uploadedImageObject.id;

  return { url, id: fileId };
};

// export const uploadImage = async (imageFile: File): Promise<any> => {
//     return new Promise((resolve, reject) => {
//       const url = `${API_URL}/api/upload`;

//       const formData = new FormData();
//       formData.append("files", imageFile); // 'files' is the key expected by Strapi or your backend
//       console.log('formData uploadApi', formData);
//       fetch(url, {
//         method: 'POST',
//         body: formData,
//       })
//         .then((response) => {
//           if (!response.ok) {
//             return response.json().then((errorData) => {
//               reject(errorData);
//             });
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log('data uploadApi', data);
//           resolve(data[0]); // Assuming data[0] contains the uploaded file's information
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   };
