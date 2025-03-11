// import fs from 'node:fs/promises';
import dotenv from 'dotenv';
dotenv.config();
class ParkService {
    constructor() {
        this.baseURL = process.env.API_BASE_URL || '';
        this.apiKey = process.env.API_KEY || '';
    }
    async getParksByState(state) {
        try {
            const response = await fetch(`${this.baseURL}/parks?limit=10&stateCode=${state}&api_key=${this.apiKey}`);
            const parks = await response.json();
            const mappedParks = await this.parkDataMapping(parks.data);
            return mappedParks;
        }
        catch (err) {
            console.log('Error:', err);
            return err;
        }
    }
    async parkDataMapping(parks) {
        const parksArray = parks.map((park) => {
            const parkObject = {
                id: park.id,
                fullName: park.fullName,
                description: park.description,
                url: park.url,
                designation: park.designation,
                images: park.images,
            };
            return parkObject;
        });
        return parksArray;
    }
}
export default new ParkService();
