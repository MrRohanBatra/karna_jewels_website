export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "karna_products");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dyps8uvdp/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Upload failed");
  }

  return data.secure_url;
}
export const cdn = (url, w = 600) =>
  url.replace("/upload/", `/upload/q_auto,f_auto,w_${w}/`);
