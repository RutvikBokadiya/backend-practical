import axios from "axios";

export async function makeGetApiCall(
  url: string,
  params = {},
  headers = {},
  data = {}
) {
  try {
    const response = await axios.get(url, {
      headers,
      data,
      params,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "API call failed:",
      error?.response ? error?.response?.data : error?.message
    );
    return false;
  }
}

export async function makePostApiCall(
  url: string,
  data = {},
  headers = {},
  params = {}
) {
  try {
    const response = await axios.post(url, {
      headers,
      data,
      params,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "API call failed:",
      error?.response ? error?.response?.data : error?.message
    );
    return false;
  }
}
