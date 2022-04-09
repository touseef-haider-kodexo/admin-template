const getLocationFromGoogleResult = (address) => {
  console.log("getLocationFromGoogleResult", address);
  if (!address) {
    return null;
  }
  const obj = {};
  address.forEach((add) => {
    if (add.types.includes("postal_code")) {
      obj.zip_code = add?.long_name;
    }
    if (add.types.includes("locality")) {
      obj.city = add?.long_name;
    }
    if (add.types.includes("administrative_area_level_1")) {
      obj.state = add?.long_name;
    }
  });

  return obj;
};

export default getLocationFromGoogleResult;
