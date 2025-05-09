// import React, { useState, useEffect } from 'react';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const DropdownLocation = () => {
//   const [provinces, setProvinces] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [subDistricts, setSubDistricts] = useState([]);
//   const [location, setLocation] = useState({
//     province: '',
//     district: '',
//     subDistrict: '',
//     postalCode: '',
//   });

//   useEffect(() => {
//     // ดึงข้อมูลจังหวัดเมื่อคอมโพเนนต์ถูกสร้าง
//     fetch('https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces')
//       .then(response => response.json())
//       .then(data => setProvinces(data.data))
//       .catch(error => console.error('Error fetching provinces:', error));
//   }, []);

//   const handleProvinceChange = (event) => {
//     const selectedProvince = event.target.value;
//     setLocation(prev => ({
//       ...prev,
//       province: selectedProvince,
//       district: '',
//       subDistrict: '',
//       postalCode: '',
//     }));

//     // ดึงข้อมูลอำเภอเมื่อเลือกจังหวัด
//     fetch(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${selectedProvince}/district`)
//       .then(response => response.json())
//       .then(data => setDistricts(data.data))
//       .catch(error => console.error('Error fetching districts:', error));
//   };

//   const handleDistrictChange = (event) => {
//     const selectedDistrict = event.target.value;
//     setLocation(prev => ({
//       ...prev,
//       district: selectedDistrict,
//       subDistrict: '',
//       postalCode: '',
//     }));

//     // ดึงข้อมูลตำบลเมื่อเลือกอำเภอ
//     fetch(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${location.province}/district/${selectedDistrict}`)
//       .then(response => response.json())
//       .then(data => setSubDistricts(data.data))
//       .catch(error => console.error('Error fetching subdistricts:', error));
//   };

//   const handleSubDistrictChange = (event) => {
//     const selectedSubDistrict = event.target.value;
//     setLocation(prev => ({
//       ...prev,
//       subDistrict: selectedSubDistrict,
//       postalCode: '', // คุณสามารถเพิ่มการดึงรหัสไปรษณีย์ที่นี่หากมีข้อมูล
//     }));
//   };

//   return (
//     <div className="w-full px-2 mt-4">
//       <FormControl fullWidth className="mt-4">
//         <InputLabel id="province-label">จังหวัด</InputLabel>
//         <Select
//           labelId="province-label"
//           id="province"
//           value={location.province}
//           onChange={handleProvinceChange}
//         >
//           {provinces.map((province) => (
//             <MenuItem key={province} value={province}>
//               {province}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {location.province && (
//         <FormControl fullWidth className="mt-4">
//           <InputLabel id="district-label">อำเภอ</InputLabel>
//           <Select
//             labelId="district-label"
//             id="district"
//             value={location.district}
//             onChange={handleDistrictChange}
//           >
//             {districts.map((district) => (
//               <MenuItem key={district} value={district}>
//                 {district}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}

//       {location.district && (
//         <FormControl fullWidth className="mt-4">
//           <InputLabel id="sub-district-label">ตำบล</InputLabel>
//           <Select
//             labelId="sub-district-label"
//             id="subDistrict"
//             value={location.subDistrict}
//             onChange={handleSubDistrictChange}
//           >
//             {subDistricts.map((subDistrict) => (
//               <MenuItem key={subDistrict} value={subDistrict}>
//                 {subDistrict}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}

// {location.subDistrict && (
//         <FormControl fullWidth className="mt-4">
//           <InputLabel id="postal-code-label">รหัสไปรษณีย์</InputLabel>
//           <Select
//             labelId="postal-code-label"
//             id="postalCode"
//             value={location.postalCode}
//             disabled
//           >
//             {/* ตัวอย่าง: รหัสไปรษณีย์อาจถูกรวบรวมจาก API หรือคำนวณได้ */}
//             <MenuItem value={location.postalCode}>
//               {location.postalCode || "กำลังโหลด..."}
//             </MenuItem>
//           </Select>
//         </FormControl>
//       )}
//     </div>
//   );
// };

// export default DropdownLocation;

 
// import React, { useState } from "react";
// import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// const DropdownLocation = () => {
//   const [location, setLocation] = useState({
//     province: "",
//     district: "",
//     subDistrict: "",
//     postalCode: "",
//   });

//   const provinces = ["กรุงเทพมหานคร", "เชียงใหม่", "ภูเก็ต", "ชลบุรี"];
//   const districts = {
//     กรุงเทพมหานคร: ["เขตพระนคร", "เขตดุสิต", "เขตบางรัก"],
//     เชียงใหม่: ["เมืองเชียงใหม่", "แม่ริม", "หางดง"],
//     ภูเก็ต: ["เมืองภูเก็ต", "กะทู้", "ถลาง"],
//     ชลบุรี: ["เมืองชลบุรี", "ศรีราชา", "บางละมุง"],
//   };
//   const subDistricts = {
//     เขตพระนคร: ["บางขุนพรหม", "ตลาดยอด"],
//     เขตดุสิต: ["ดุสิต", "วชิรพยาบาล"],
//     เมืองเชียงใหม่: ["สุเทพ", "ช้างเผือก"],
//     แม่ริม: ["ริมใต้", "ริมเหนือ"],
//   };
//   const postalCodes = {
//     บางขุนพรหม: "10200",
//     ตลาดยอด: "10200",
//     ดุสิต: "10300",
//     วชิรพยาบาล: "10300",
//     สุเทพ: "50200",
//     ช้างเผือก: "50300",
//     ริมใต้: "50180",
//     ริมเหนือ: "50180",
//   };

//   const handleLocationChange = (event, key) => {
//     const value = event.target.value;
//     setLocation((prev) => ({
//       ...prev,
//       [key]: value,
//       ...(key === "province" ? { district: "", subDistrict: "", postalCode: "" } : {}),
//       ...(key === "district" ? { subDistrict: "", postalCode: "" } : {}),
//       ...(key === "subDistrict" ? { postalCode: postalCodes[value] || "" } : {}),
//     }));
//   };

//   return (
//     <div className="w-full px-2 mt-4">
//       <FormControl fullWidth className="mt-4">
//         <InputLabel id="province-label">จังหวัด</InputLabel>
//         <Select
//           labelId="province-label"
//           id="province"
//           value={location.province}
//           onChange={(e) => handleLocationChange(e, "province")}
//         >
//           {provinces.map((province) => (
//             <MenuItem key={province} value={province}>
//               {province}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {location.province && (
//         <FormControl fullWidth className="mt-4">
//           <InputLabel id="district-label">อำเภอ</InputLabel>
//           <Select
//             labelId="district-label"
//             id="district"
//             value={location.district}
//             onChange={(e) => handleLocationChange(e, "district")}
//           >
//             {districts[location.province]?.map((district) => (
//               <MenuItem key={district} value={district}>
//                 {district}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}

//       {location.district && (
//         <FormControl fullWidth className="mt-4">
//           <InputLabel id="sub-district-label">ตำบล</InputLabel>
//           <Select
//             labelId="sub-district-label"
//             id="subDistrict"
//             value={location.subDistrict}
//             onChange={(e) => handleLocationChange(e, "subDistrict")}
//           >
//             {subDistricts[location.district]?.map((subDistrict) => (
//               <MenuItem key={subDistrict} value={subDistrict}>
//                 {subDistrict}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       )}

//       {location.subDistrict && (
//         <FormControl fullWidth className="mt-4">
//           <InputLabel id="postal-code-label">รหัสไปรษณีย์</InputLabel>
//           <Select
//             labelId="postal-code-label"
//             id="postalCode"
//             value={location.postalCode}
//             disabled
//           >
//             <MenuItem value={location.postalCode}>{location.postalCode}</MenuItem>
//           </Select>
//         </FormControl>
//       )}
//     </div>
//   );
// };

// export default DropdownLocation;

import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Alert } from "@mui/material";
import data from "./data.json"; // โหลดข้อมูล JSON

const DropdownLocation = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState({
    houseNumber: "",
    street: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
  });
  const [combinedAddress, setCombinedAddress] = useState("");
  const [errors, setErrors] = useState({
    houseNumber: false,
    province: false,
    district: false,
    subDistrict: false,
  });

  // โหลดข้อมูลจังหวัด
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const uniqueProvinces = [
        ...new Set(
          data
            .filter((entry) => entry.provinceList && entry.provinceList[0])
            .map((entry) => entry.provinceList[0].provinceName)
        ),
      ];
      setProvinces(uniqueProvinces);
    }
  }, []);

  // อัปเดต combinedAddress ทุกครั้งที่ address เปลี่ยนแปลง
  useEffect(() => {
    const combined = `${address.houseNumber ? `${address.houseNumber}` : ""}${
      address.street ? ` ถนน${address.street} ` : ""
    } ${address.subDistrict}  ${address.district}  ${address.province} ${address.postalCode}`;
    setCombinedAddress(combined);
  }, [address]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !value && name !== "street" }));
  };

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setAddress((prev) => ({
      ...prev,
      province: selectedProvince,
      district: "",
      subDistrict: "",
      postalCode: "",
    }));
    setErrors((prev) => ({ ...prev, province: !selectedProvince }));

    const filteredDistricts = data
      .filter(
        (entry) =>
          entry.provinceList &&
          entry.provinceList[0]?.provinceName === selectedProvince &&
          entry.districtList
      )
      .flatMap((entry) =>
        entry.districtList.map((d) => d.districtName)
      );
    setDistricts([...new Set(filteredDistricts)]);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setAddress((prev) => ({
      ...prev,
      district: selectedDistrict,
      subDistrict: "",
      postalCode: "",
    }));
    setErrors((prev) => ({ ...prev, district: !selectedDistrict }));

    const filteredSubDistricts = data
      .filter(
        (entry) =>
          entry.districtList &&
          entry.districtList.some((d) => d.districtName === selectedDistrict) &&
          entry.subDistrictList
      )
      .flatMap((entry) =>
        entry.subDistrictList.map((s) => s.subDistrictName)
      );
    setSubDistricts([...new Set(filteredSubDistricts)]);
  };

  const handleSubDistrictChange = (event) => {
    const selectedSubDistrict = event.target.value;
    const postal = data
      .find(
        (entry) =>
          entry.subDistrictList &&
          entry.subDistrictList.some((s) => s.subDistrictName === selectedSubDistrict)
      )
      ?.zipCode;

    setAddress((prev) => ({
      ...prev,
      subDistrict: selectedSubDistrict,
      postalCode: postal || "ไม่พบรหัสไปรษณีย์",
    }));
    setErrors((prev) => ({ ...prev, subDistrict: !selectedSubDistrict }));
  };

  const validateForm = () => {
    const newErrors = {
      houseNumber: !address.houseNumber,
      province: !address.province,
      district: !address.district,
      subDistrict: !address.subDistrict,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert(`ที่อยู่: ${combinedAddress}`);
    } else {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
    }
  };

  return (
    <>
    <div className="w-full px-2 mt-4">
      {/* TextField สำหรับกรอกบ้านเลขที่ */}
      <TextField
        fullWidth
        label="บ้านเลขที่"
        name="houseNumber"
        value={address.houseNumber}
        onChange={handleInputChange}
        error={errors.houseNumber}
        helperText={errors.houseNumber && "กรุณากรอกบ้านเลขที่"}
        className="mt-4 bg-white"
        />
    </div>

    <div className="w-full px-2 mt-4">
      {/* TextField สำหรับกรอกถนน */}
      <TextField
        fullWidth
        label="ถนน"
        name="street"
        value={address.street}
        onChange={handleInputChange}
        className="mt-4 bg-white"
        />
    </div>

    <div className="w-full px-2 mt-4">
      {/* Dropdown สำหรับจังหวัด */}
      <FormControl fullWidth className="mt-4 bg-white" error={errors.province}>
        <InputLabel id="province-label">จังหวัด</InputLabel>
        <Select
          labelId="province-label"
          id="province"
          value={address.province}
          onChange={handleProvinceChange}
          >
          {provinces.map((province) => (
              <MenuItem key={province} value={province}>
              {province}
            </MenuItem>
          ))}
        </Select>
        {errors.province && <p style={{ color: "red" }}>กรุณาเลือกจังหวัด</p>}
      </FormControl>
    </div>

    <div className="w-full px-2 mt-4">
      {/* Dropdown สำหรับอำเภอ */}
      {address.province && (
          <FormControl fullWidth className="mt-4 bg-white" error={errors.district}>
          <InputLabel id="district-label">อำเภอ</InputLabel>
          <Select
            labelId="district-label"
            id="district"
            value={address.district}
            onChange={handleDistrictChange}
            >
            {districts.map((district) => (
                <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
          {errors.district && <p style={{ color: "red" }}>กรุณาเลือกอำเภอ</p>}
        </FormControl>
      )}
      </div>

    <div className="w-full px-2 mt-4">
      {/* Dropdown สำหรับตำบล */}
      {address.district && (
          <FormControl fullWidth className="mt-4 bg-white" error={errors.subDistrict}>
          <InputLabel id="sub-district-label">ตำบล</InputLabel>
          <Select
            labelId="sub-district-label"
            id="subDistrict"
            value={address.subDistrict}
            onChange={handleSubDistrictChange}
            >
            {subDistricts.map((subDistrict) => (
                <MenuItem key={subDistrict} value={subDistrict}>
                {subDistrict}
              </MenuItem>
            ))}
          </Select>
          {errors.subDistrict && <p style={{ color: "red" }}>กรุณาเลือกตำบล</p>}
        </FormControl>
      )}
      </div>

      <div className="w-full px-2 mt-4">
        {/* แสดงรหัสไปรษณีย์ */}
        {address.subDistrict && (
            <div className="w-full">
            <strong>รหัสไปรษณีย์: </strong>
            {address.postalCode}
            </div>
        )}
      </div>

        <div className="w-full px-2 mt-4">
      {/* แสดงข้อมูลที่อยู่รวม */}
      {combinedAddress && (
          <div className="mt-4">
          <strong>ที่อยู่ทั้งหมด: </strong>
          <p>{combinedAddress}</p>
        </div>
      )}
        </div>

      {/* ปุ่มส่งข้อมูล */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className="mt-4"
        onClick={handleSubmit}
      >
        ส่งข้อมูล
      </Button>
    </>
  );
};

export default DropdownLocation;
