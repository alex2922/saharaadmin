// testimonails

const baseUrl = "https://www.vps.diwiseglobal.com/saharaAmmusment";

export const getTestimonials = async () => {
  try {
    const response = await fetch(`${baseUrl}/testemonials/GetAll`, {
      method: "GET",
    });
    const jsonData = await response.json();
    return jsonData.reverse();
  } catch (error) {
    console.log(error);
  }
};


