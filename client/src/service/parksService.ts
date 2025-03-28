class ParksService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || "https://developer.nps.gov/api/v1";
    this.apiKey = process.env.API_KEY || "";
  }

  async getParksByState(state: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/parks?limit=10&stateCode=${state}&api_key=${this.apiKey}`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("❌ Parks API error:", error);
      return [];
    }
  }
}

export default new ParksService();
