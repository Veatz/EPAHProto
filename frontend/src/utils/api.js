export const registerCBO = async (formData) => {
  try {
    console.log("Sending API request with:", formData); // Log request payload

    // Prepare the form data to be sent (if you're also uploading files)
    const data = new FormData();

    // Add form data fields (for instance, if there are fields in formData object)
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    const response = await fetch("http://localhost:4000/api/cbos", {
      method: "POST",
      body: data,  // Directly send the formData object
    });

    if (!response.ok) {
      const errorText = await response.text(); // Capture backend error response
      console.error("API Response Error:", response.status, errorText);
      throw new Error(`Failed to register CBO: ${response.status} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log("API Response Data:", responseData); // Log successful response
    return responseData;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};
