export const uploadImage = async (imageFile) => {
  if (!imageFile) {
    throw new Error("Please select an image");
  }

  if (imageFile.size > 1024 * 1024) {
    throw new Error("Image size must be less than 1MB");
  }

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error("ImgBB API key is missing");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.error?.message || "Image upload failed"
    );
  }

  return result.data.display_url;
};