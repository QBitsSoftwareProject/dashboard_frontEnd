import axiosInstance from "../api/axios";

export const storeMethod = async (methodType, category, resouceName, discription, imageURL, resourceURL) => {
  try {

    const token = localStorage.getItem("authToken");

    // Prepare the payload with mark converted to a number
    const payload = {
      methodType: methodType,
      category: category,
      resouceName: resouceName,
      discription: discription,
      imageURL: imageURL,
      resourceURL: resourceURL
    };

    // Send POST request using axiosInstance
    const response = await axiosInstance.post('/api/v1/method/add-method', payload, { headers: { authtoken: token } });


    if (response.status >= 200 && response.status < 300) {
      console.log("Data sent successfully");
    } else {
      console.error(`Failed to send data to the server. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending method:', error.message);
  }
};


export const getMindRelaxingMethod = async () => {
  try {

    const token = localStorage.getItem("authToken");

    const response = await axiosInstance.get(`/api/v1/method/get-method`, { headers: { authtoken: token } });

    return response.data;

  } catch (err) {
    console.log(err);
  }
};


export const getMindRelaxingMethodById = async (id) => {
  try {

    const token = localStorage.getItem("authToken");

    const response = await axiosInstance.get(`/api/v1/method/get-methodbyid/${id}`, { headers: { authtoken: token } });
    return response.data;

  } catch (err) {
    console.log(err);
  }
};


export const deleteMindRelaxingMethodById = async (id) => {
  try {

    const token = localStorage.getItem("authToken");

    const response = await axiosInstance.delete(`/api/v1/method/delete-methodbyid/${id}`, { headers: { authtoken: token } });
    return response.data;

  } catch (err) {
    console.log(err);
  }
};

export const updateMethodById = async (id, methodType, category, resourceName, description, imageURL, resourceURL) => {
  try {

    const token = localStorage.getItem("authToken");

    // Send PUT request using axiosInstance
    const response = await axiosInstance.put(`/api/v1/method/update-method/${id}`, {
      methodType: methodType,
      category: category,
      resouceName: resourceName,
      discription: description,
      imageURL: imageURL,
      resourceURL: resourceURL
    }
      , { headers: { authtoken: token } });

    if (response.status >= 200 && response.status < 300) {
      console.log("Data updated successfully");
    } else {
      console.error(`Failed to update data on the server. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating method:', error.message);
  }
};