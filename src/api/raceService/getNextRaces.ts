import axios from "axios";
import type { RacesResponse } from "./types";
import { API_BASE_URL } from "../../utils/utils";

export const getNextRaces = async (): Promise<RacesResponse> => {
  try {
    const response = await axios.get<RacesResponse>(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw error; }
  }
