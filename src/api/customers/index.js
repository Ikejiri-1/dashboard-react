import axios from "axios";

export async function getCustomer() {
  try {
    const response = await axios.get("http://localhost:3000/customers");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
