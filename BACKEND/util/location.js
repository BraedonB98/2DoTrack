const axios = require("axios");
const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.GoogleMapsApi_Key}`
  ); //encodeURIComponent removes all white space and weird things about address   ---- await is the same as adding a then bust easier to read

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    throw new HttpError(
      "Could not find location for the specified address.",
      422
    );
  }
  if (!data || data.status === "REQUEST_DENIED") {
    console.log(data);
    throw new HttpError("Google denied request.", 502);
  }

  const location = {
    address: data.formatted_address,
    coordinates: data.results[0].geometry.location,
  };
  return location;
}

module.exports = getCoordsForAddress;
