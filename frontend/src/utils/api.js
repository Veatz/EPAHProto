const BASE_URL = "http://localhost:4000/api"; // ✅ Centralized API base URL

// Register a new CBO (POST)
export const registerCBO = async (formData) => {
  try {
    console.log("Sending API request with:", JSON.stringify(formData, null, 2));

    const response = await fetch(`${BASE_URL}/cbos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response Error:", response.status, errorText);
      throw new Error(`Failed to register CBO: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data);
    return data;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};

// Get all CBOs (GET)
export const getCBOs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/cbos`);
    if (!response.ok) throw new Error("Failed to fetch CBOs");
    return await response.json();
  } catch (error) {
    console.error("Error fetching CBOs:", error);
    throw error;
  }
};

// Get a single CBO by ID (GET)
export const getCBO = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/cbo/${id}`);
    if (!response.ok) throw new Error("CBO not found");
    return await response.json();
  } catch (error) {
    console.error("Error fetching CBO:", error);
    throw error;
  }
};

// Update a CBO (PATCH)
export const updateCBO = async (id, updateData) => {
  try {
    const response = await fetch(`${BASE_URL}/cbo/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response Error:", response.status, errorText);
      throw new Error(`Failed to update CBO: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating CBO:", error);
    throw error;
  }
};

// Delete a CBO (DELETE)
export const deleteCBO = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/cbo/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete CBO");
    return await response.json();
  } catch (error) {
    console.error("Error deleting CBO:", error);
    throw error;
  }
};
