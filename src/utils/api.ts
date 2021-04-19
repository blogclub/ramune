// Modules
import axios from "axios";

// Types
import { Show } from "@typings/types";

// Constants
const SHOW_ENDPOINT = import.meta.env.VITE_SHOW_ENDPOINT;

/**
 * Fetches all available shows
 */
export async function getShows (): Promise<Show[]|[]> {
	try {

		const { data: response } = await axios.get(`${ SHOW_ENDPOINT }/shows`);

		if (response.success && response.data) {
			return response.data;
		} else {
			throw new Error(response.message);
		}

	} catch (err) {
		console.error(err);
		return [];
	}
}

/**
 * Fetches specified show by its ID
 */
export async function getShow (showId: string): Promise<Show|null> {
	try {

		const { data: response } = await axios.get(`${ SHOW_ENDPOINT }/shows/${ showId }`);

		if (response.success && response.data) {
			return response.data;
		} else {
			throw new Error(response.message);
		}

	} catch (err) {
		console.error(err);
		return null;
	}
}