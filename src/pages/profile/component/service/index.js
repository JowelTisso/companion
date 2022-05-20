import axios from "axios";

export const uploadImages = async (files) => {
  try {
    const url = "https://api.cloudinary.com/v1_1/dlt3d53ac/image/upload";
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "v9zrpwzu");
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    return res.json();
  } catch (err) {
    console.log(err.message);
  }
};
