const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAboutData = async () => {
  try {
    const response = await fetch(`${baseUrl}viedoAndAboutSection/get/2`, {
      method: "GET",
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error );
  }
};