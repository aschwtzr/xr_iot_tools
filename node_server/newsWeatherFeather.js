import { feathers } from "@feathersjs/feathers";

const UserLocation = {
  username: "",
  latitude: 0.0,
  longitude: 0.0,
}

class UserLocationService {
  userLocations = {};

  async find() {
    // Just return all our messages
    return this.userLocations
  }

  /**
   * 
   * @param {UserLocation} data 
   * @returns 
   */
  async create(data) {
    const userLocation = {
      username: data.username,
      latitude: data.latitude,
      longitude: data.longitude
    }

    // Add new message to the list
    this.messages.push(message)

    return message
  }

}

  /**
   * 
   * @param {UserLocation} userLocation 
   * @returns 
   */
function createUserLocation(userLocation) {

}

createUserLocation()