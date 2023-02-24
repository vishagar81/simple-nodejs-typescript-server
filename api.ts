import { PopulationResponse } from './types/population';
import axios, { AxiosResponse } from 'axios';

export const getPopulationData = async(): Promise<PopulationResponse> => {
  return sendGETRequest().then((response) => response.data);
}

const sendGETRequest = async () : Promise<AxiosResponse> => {
  let axiosResponse = null;
  console.log(`Making axios GET request...`);

  axiosResponse = await axios
      .get(
        `https://datausa.io/api/data`,
        {
          params: { drilldowns: "Nation", measures: "Population" },
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
      .catch((error) => {
        throw Error(`Population API returned error: ${error}`);
      });
    console.log(`Axios request returned successfully...`);

    if (axiosResponse.data.errors && axiosResponse.data.errors.length > 0) {
      throw new Error(`Error(s) from data API: ${JSON.stringify(axiosResponse.data.errors)}`);
    }

    return axiosResponse;
}

