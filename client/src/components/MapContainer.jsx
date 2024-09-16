import "./MapContainer.css";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const mapStyles = {
  width: "100%", 
  height: "100%", 
};

const center = {
  lat: 60.3978,
  lng: 25.6620,
};

let service = null;

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      suggestions: [],
      places: [],
      showSuggestions: true, 
    };
  }

  savePlace = (place) => {
    this.setState((prevState) => ({
      places: [...prevState.places, place],
      input: "", 
    }));
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.search();
    }
  };

  onMarkerClick = (props, marker, e) => {
    console.log(props, marker, e);
  };

  initPlaces = (mapProps, map) => {
    const { google } = mapProps;
    service = new google.maps.places.PlacesService(map);
  };

  search = () => {
    const { input } = this.state;
    service.textSearch({ query: input }, (suggestions) => {
      console.log(suggestions);
      this.setState({
        suggestions,
        showSuggestions: true, 
      });
    });
  };

  closeSuggestions = () => {
    this.setState({ showSuggestions: false }); 
  };

  render() {
    const { suggestions, places, showSuggestions } = this.state;

    var bounds = new this.props.google.maps.LatLngBounds(center);
    for (var i = 0; i < places.length; i++) {
      bounds.extend(places[i].geometry.location);
    }

    return (
      <div className="MapContainer">
        <h1 className="header">Too hungry to cook?</h1>
        <p>We've all been there... Find a restaurant instead!</p>
        <div className="form">
  <Form.Control
    size="lg"
    value={this.state.input}
    onChange={this.handleChange}
    placeholder="Search..."
    onKeyDown={this.handleKeyDown}
  />
  <img
    src="https://www.svgrepo.com/show/356535/search-button.svg"
    alt="Search"
    className="search-icon"
    onClick={this.search}
  />
</div>


        {showSuggestions && (
  <div className="list-group">
    <span className="close-results" onClick={this.closeSuggestions}>
      ×
    </span>
    {suggestions.map((place, i) => (
      <div key={i} className="list-group-item">
        <div className="place-info">
          <span className="place-name">{place.name}</span>
          <span className="place-address">
            {place.formatted_address}
          </span>
        </div>
        <Button
          className="show-button"
          variant="outline-primary"
          onClick={() => this.savePlace(place)}
        >
          Show
        </Button>
      </div>
    ))}
  </div>
)}

        <div className="map-container">
          <Map
            google={this.props.google}
            style={mapStyles}
            zoom={12}
            initialCenter={center}
            onReady={this.initPlaces}
            bounds={bounds}
          >
            {places.map((marker, i) => (
              <Marker
                onClick={this.onMarkerClick}
                name={marker.name}
                position={marker.geometry.location}
                key={i}
              />
            ))}
          </Map>
          {places.length === 0 && (
            <div className="placeholder-content">
              <p>No results to display</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey,
})(MapContainer);
