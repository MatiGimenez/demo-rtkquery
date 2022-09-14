import axiosInstance from '../store/api/axiosInstance'

const baseAxiosQuery = async ({url, method = 'get', ...restArgs}) => {
  try {
    return await axiosInstance.request({url, method, ...restArgs})
  } catch (axiosError) {
    const err = axiosError
    return {error: {status: err.response?.status, data: err.response?.data}}
  }
}

export default baseAxiosQuery