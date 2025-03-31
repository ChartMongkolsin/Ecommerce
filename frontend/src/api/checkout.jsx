import axios from "axios";

export const checkout = async (token, id) => {
    return await axios.post("http://localhost:8889/checkout", { id }, {
        headers: { Authorization: `Bearer ${token}` }
    })
}
export const checkoutStatus = async (token, session) => {
    return await axios.get(`http://localhost:8889/checkout/checkout-status/${session}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}