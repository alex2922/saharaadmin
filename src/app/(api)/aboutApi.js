const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAboutData = async () => {
  try {
    const response = await fetch(`${baseUrl}/viedoAndAboutSection/get/2`, {
      method: "GET",
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error );
  }
};





export const updateAboutData = async() => {
  try {
    const response = await fetch(`${baseUrl}/viedoAndAboutSection/update/2`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        name: name,
        feedBack: review,  
        stars: star
    })
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error );
  }
}
