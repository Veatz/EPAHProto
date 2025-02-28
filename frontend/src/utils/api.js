export const registerCBO = async (formData) => {
  try {
    console.log("Sending API request with:", JSON.stringify(formData, null, 2)); // Log request payload

    const response = await fetch("http://localhost:4000/api/cbo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Capture backend error response
      console.error("API Response Error:", response.status, errorText);
      throw new Error(`Failed to register CBO: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data); // Log successful response
    return data;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};
