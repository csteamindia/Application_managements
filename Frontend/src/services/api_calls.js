import AxiosInstance from './api_nstance'

export const getCall = async({url}) => await AxiosInstance.get(url)
    .then((response) => {
        return response;
    })
    .catch((error) => {
        console.log(error)
    });

  
export const postCall = async({url, data}) => await AxiosInstance.post(url, data)
    .then((response) => {
        return response
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
  
export const deleteCall = async({url, data}) => await AxiosInstance.post(url, data)
    .then((response) => {
        return response
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });