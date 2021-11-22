import { API_END_POINT } from './constants.js';

const request = async (defaultValue, options = {}) => {
  try {
    const data = await fetch(API_END_POINT);
    // console.log(await data.json());

    if (data.ok) {
      return await data.json();
    } else {
      return defaultValue;
    }
  } catch (error) {
    alert(error);
    return defaultValue;
  }
};

export { request };
