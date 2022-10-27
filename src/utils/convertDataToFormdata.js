//If your data contains images, you need to create a new FormData and add a child to it
//This function convert your data

export const convertDataToFormdata = (dataObj) => {
  const formdata = new FormData();
  for (const key in dataObj) {
    formdata.append(key, dataObj[key]);
  }
  return formdata;
};
