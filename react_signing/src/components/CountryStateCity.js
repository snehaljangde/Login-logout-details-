import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
//import axios from "axios";

export const CountryStateCity = ({ cscHandler, cscState, }) => {
  const [countries, setCountry] = useState([]);
  //const [countryError, setCountryError] = useState("");
  const [states, setState] = useState([]);
  const [cities, setCity] = useState([]);
  const [selectedCountry, setselectedCountry] = useState({
    key: "Select Country",
    value: "",
  });
  const [selectedState, setselectedState] = useState({
    key: "Select State",
    value: "",
  });
  const [selectedCity, setselectedCity] = useState({
    key: "Select City",
    value: "",
  });

  // country
  // if (!cscState.country) {
  //   setCountryError("Please select a country.");
  // } else {
  //   setCountryError("");
  // }
  
  const handleSelectCountry = (key, e) => {
    setselectedCountry({ key, value: e.target.value });
    cscHandler({
      ...cscState,
      country: key,
    });
  };
  const handleSelectState = (key, e) => {
    setselectedState({ key, value: e.target.value });
    cscHandler({
      ...cscState,
      state: key,
    });
  };

  const handleSelectCity = (key, e) => {
    setselectedCity({ key, value: e.target.value });
    cscHandler({
      ...cscState,
      city: key,
    });
  };

  useEffect(() => {
    const getcountry = async () => {
      const rescountry = await fetch("http://localhost:5000/country", {
        method: "GET",
      });
      const rescon = await rescountry.json();
      setCountry(rescon);
    };

    getcountry();
  }, []);

  useEffect(() => {
    const getstate = () => {
      if (selectedCountry && selectedCountry.value) {
        fetch(`http://localhost:5000/state?country=${selectedCountry.value}`)
          .then((res) => res.json())
          .then((stateRes) => setState(stateRes));
      }
    };
    getstate();
  }, [selectedCountry]);

  useEffect(() => {
    const getCities = () => {
      if (selectedState && selectedState.value) {
        fetch(`http://localhost:5000/city?state=${selectedState.value}`)
          .then((res) => res.json())
          .then((cityRes) => setCity(cityRes));
      }
    };
    getCities();
  }, [selectedState]);

  return (
    <div className="drodown-wrapper">
      <DropdownButton
        id="country"
        onSelect={(key, e) => handleSelectCountry(key, e)}
        className="mb-3 col-lg-6 custom-width"
        variant="dark"
        title={selectedCountry?.key || countries[0]?.name}>
        {countries.map((country) => (
          <Dropdown.Item
            as="option"
            name="country"
            key={country._id}
            id={`country-${country._id}`}
            value={country._id}
            eventKey={country.name}
            className="mb-3 col-lg-6"
          >
            {country.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {states.length > 0 ? (
        <DropdownButton
          id="states"
          title={selectedState?.key || states[0]?.name}
          className="mb-3 col-lg-6 custom-width"
          variant="dark"
          onSelect={(key, e) => handleSelectState(key, e)}
        >
          {states?.map((state) => (
            <Dropdown.Item
              name="state"
              key={state._id}
              value={state._id}
              className="mb-3 col-lg-6"
              id={`state-${state?._id}`}
              as="option"
              eventKey={state.name}
            >
              {state?.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      ) : (
        ""
      )}
      {cities.length > 0 ? (
        <DropdownButton
          id="cities"
          title={selectedCity?.key || cities[0]?.name}
          className="mb-3 col-lg-6 custom-width"
          variant="dark"
          onSelect={(key, e) => handleSelectCity(key, e)}
        >
          {cities?.map((city) => (
            <Dropdown.Item
              name="city"
              as="option"
              key={city?._id}
              eventKey={city.name}
              value={city._id}
              id={`city-${city?._id}`}
            >
              {city.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      ) : (
        ""
      )}
    </div>
  );
};
