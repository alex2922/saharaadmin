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

export const deleteTestimonials = async (testimonialId) => {
  try {
    await fetch(`${baseUrl}/testemonials/delete?id=${testimonialId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to delete testimonial: ${response.status} ${response.statusText}`
      );
    }
    return { success: true, message: "Testimonial deleted successfully" };
  } catch (error) {
    console.log(error);
  }
};

export const addTestimonials = async ()=>{
    try {
        await fetch(`${baseUrl}/testemonials/delete?id=${testimonialId}`, {
            method: "DELETE",
          });
          if (!response.ok) {
            throw new Error(
              `Failed to delete testimonial: ${response.status} ${response.statusText}`
            );
          }
          return { success: true, message: "Testimonial deleted successfully" };
    } catch (error) {
        console.log(error);
    }
}