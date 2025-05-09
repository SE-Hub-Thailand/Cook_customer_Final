import { useState } from "react";
// import Header from '../components/Header';
import Container from "@mui/material/Container";
import Checkbox from "@mui/material/Checkbox";
import { NavLink } from "react-router-dom";

export default function PDPA() {
  // State to track the checkbox
  const [isChecked, setIsChecked] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      {/* <Header /> */}
      <Container maxWidth="sm">
        <div className="w-full h-auto bg-white rounded-md p-5 mt-10 text-justify leading-loose">
		<p>
			{
				"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many websites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many websites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
			}
		</p>
        </div>
        <div className="mt-4">
          <Checkbox
            id="checkedOne"
            value="check"
            required
            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="pb-14">
            <strong>กุ๊ก</strong>ให้ความสำคัญเกี่ยวกับความปลอดภัยข้อมูลของคุณ{" "}
            <span className="text-justify leading-loose">
              และเพื่อให้คุณมั่นใจว่า
              กุ๊กมีความมุ่งมั่นที่จะให้ความคุ้มครองและดำเนินการด้วยความรับผิดชอบต่อการเก็บรวบรวม
              ใช้ เปิดเผย และโอนข้อมูลของคุณ กุ๊กจึงขอความยินยอมจากคุณ
            </span>
          </span>
        </div>
        <NavLink to={isChecked ? "/register" : "#"} className="block">
            <button
            className={`w-full h-10 mt-4 mb-4 rounded-md ${isChecked ? 'bg-yellow-hard-bg' : 'bg-zinc-400'}`}
            disabled={!isChecked}
            >
            ต่อไป
            </button>
        </NavLink>
      </Container>
    </>
  );
}
