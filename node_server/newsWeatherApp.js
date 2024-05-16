const UserLocation = {
  username: "",
  latitude: 0.0,
  longitude: 0.0,
}

const User  = {
  lastLocation: UserLocation,
  username: "",
  placeDetails
}

const UserLocationService = {
  userLocations: {},
  addUserLocation: function(data) {
    if (!this.userLocations[data.username]) {
      this.userLocations[data.username] = []
    } else {
      this.userLocations[data.username].push(data)
    }
  },
  getLocationByUsername: function(username) {
    return this.userLocations[username]
  },
  userLocationHasChanged: function(username, latitude, longitude) {

  }
}

const geocodeUserLocation = (data) => {
  const { username, latitude, longitude } = data
  UserLocationService.addUserLocation(data)
  console.log('UserLocationService', UserLocationService)
  return {
    username,
    latitude,
    longitude
  }
}