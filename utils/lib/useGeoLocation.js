import axios from "axios";
import { useEffect } from "react";

import useAppStore from "../../src/app/stores/AppStore";

export default function useGeoLocation() {
  const { setUserLocation } = useAppStore((state) => ({
    setUserLocation: state.setUserLocation,
  }));

  useEffect(() => {
    // getLocation();
  }, []);

  async function getLocation() {
    // it will return the following attributes:
    // country, countryCode, regionName, city, lat, lon, zip and timezone
    const res = await axios.get("http://ip-api.com/json");
    // console.log(res);
    if (res.status === 200) setUserLocation(res.data);
  }
}
