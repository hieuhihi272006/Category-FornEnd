import { useState } from "react";
export default function UpLoadImage({ value  }) {
  const [image, setImage] = useState({ value });
  const handle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  return (
    <>
      {image ? (
        <div>
          <img src={value} alt="" />
        </div>
      ) : (
        <label>
          <input type="file" accept="image/**" onChange={handle} hidden />
        </label>
      )}
    </>
  );
}
