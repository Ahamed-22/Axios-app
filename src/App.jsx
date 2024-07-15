import axios from "axios";
import { useEffect, useState } from "react";
import CardItem from "./components/CardItem/CardItem";

function App() {
  const [taskId, setTaskId] = useState(10);
  const [userData, setUserData] = useState([]);
  const [isUpdateMode, setUpdateMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // CRUD Operations

  // Add Task
  const handleSubmit = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        id: taskId,
        name: userDetails.name,
        username: userDetails.username,
        email: userDetails.email,
        address: {
          street: userDetails.address.street,
          suite: userDetails.address.suite,
          city: userDetails.address.city,
          zipcode: userDetails.address.zipcode,
          geo: {
            lat: userDetails.address.geo.lat,
            lng: userDetails.address.geo.lng,
          },
        },
        phone: userDetails.phone,
        website: userDetails.website,
        company: {
          name: userDetails.company.name,
          catchPhrase: userDetails.company.catchPhrase,
          bs: userDetails.company.bs,
        },
      })
      .then((response) => {
        setUserData([...userData, response.data]);
        console.log(response.data);
        setTaskId(taskId + 1);
        resetUserDetails();
      })
      .catch((error) => console.log(error));
  };

  // Update Task
  const handleEditClick = (id) => {
    setUpdateMode(true);
    console.log(id);
    const selectedUser = userData.find((task) => task.id === id);
    setUserDetails(selectedUser);
  };

  const handleEditformSubmit = (id) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, {
        ...userDetails,
      })
      .then((response) => {
        console.log(response);
        const updatedUserData = userData.map((user) =>
          user.id === id ? response.data : user
        );
        setUserData(updatedUserData);
        resetUserDetails();
        setUpdateMode(false);
      })
      .catch((error) => console.log(error));
  };

  // Delete Task
  const handleDeleteClick = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const updatedUserData = userData.filter((user) => user.id !== id);
        setUserData(updatedUserData);
      })
      .catch((error) => console.log(error));
  };

  // Reset User Details
  const resetUserDetails = () => {
    setUserDetails({
      id: "",
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    });
  };

  const handleInputChange = (e) => {
    console.log(e.target.id, "changing");
    const { id, value } = e.target;
    const keys = id.split(".");
    if (keys.length > 1) {
      setUserDetails((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setUserDetails((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 my-4">
          <h5 className="text-center">Axios App</h5>
        </div>
        <div
          className="col-md-6 ps-5 d-flex flex-column align-items-end justify-content-center"
          style={{ height: "1000px" , marginTop : 150 }}
        >
          <div className="col-sm-12">
            <label className="fs-5 my-1" htmlFor="name">
              Enter your Name:{" "}
            </label>
            <br />
            <input
              id="name"
              className="w-100 py-1 px-2"
              type="text"
              placeholder="Name"
              value={userDetails.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12">
            <label className="fs-5 my-1" htmlFor="username">
              Enter Username:{" "}
            </label>
            <br />
            <input
              id="username"
              className="w-100 py-1 px-2"
              type="text"
              placeholder="Username"
              value={userDetails.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12">
            <label className="fs-5 my-1" htmlFor="email">
              Enter Email:{" "}
            </label>
            <br />
            <input
              id="email"
              className="w-100 py-1 px-2"
              type="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12">
            <label className="fs-5 my-1" htmlFor="address.street">
              Enter Street:{" "}
            </label>
            <br />
            <input
              id="address.street"
              className="w-100 py-1 my-2 px-2"
              type="text"
              placeholder="Street"
              value={userDetails.address.street}
              onChange={handleInputChange}
            />
            <label className="fs-5 my-1" htmlFor="address.suite">
              Enter Suite:{" "}
            </label>
            <br />
            <input
              id="address.suite"
              className="w-100 py-1 my-2 px-2"
              type="text"
              placeholder="Suite"
              value={userDetails.address.suite}
              onChange={handleInputChange}
            />
            <label className="fs-5 my-1" htmlFor="address.city">
              Enter City:{" "}
            </label>
            <br />
            <input
              id="address.city"
              className="w-100 py-1 my-2 px-2"
              type="text"
              placeholder="City"
              value={userDetails.address.city}
              onChange={handleInputChange}
            />
            <label className="fs-5 my-1" htmlFor="address.zipcode">
              Enter ZipCode:{" "}
            </label>
            <br />
            <input
              id="address.zipcode"
              className="w-100 py-1 my-2 px-2"
              type="text"
              placeholder="ZipCode"
              value={userDetails.address.zipcode}
              onChange={handleInputChange}
            />
            <label className="fs-5 my-1" htmlFor="address.geo.lat">
              Enter Latitude:{" "}
            </label>
            <br />
            <input
              id="address.geo.lat"
              className="w-100 py-1 my-2 px-2"
              type="text"
              placeholder="Latitude"
              value={userDetails.address.geo.lat}
              onChange={handleInputChange}
            />
            <label className="fs-5 my-1" htmlFor="address.geo.lng">
              Enter Longitude:{" "}
            </label>
            <br />
            <input
              id="address.geo.lng"
              className="w-100 py-1 my-2 px-2"
              type="text"
              placeholder="Longitude"
              value={userDetails.address.geo.lng}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12">
            <label className="fs-5 my-1" htmlFor="phone">
              Enter Phone:{" "}
            </label>
            <br />
            <input
              id="phone"
              className="w-100 py-1 my-2 px-2"
              type="text"
              placeholder="Phone"
              value={userDetails.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12">
            <label className="fs-5 my-1" htmlFor="website">
              Enter Website:{" "}
            </label>
            <br />
            <input
              id="website"
              className="w-100 py-1 px-2"
              type="text"
              placeholder="Website"
              value={userDetails.website}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12">
            <label className="fs-5 my-1" htmlFor="company.name">
              Enter Company Name:{" "}
            </label>
            <br />
            <input
              id="company.name"
              className="w-100 py-1 my-2 px-2"
              type="text"
              placeholder="Company Name"
              value={userDetails.company.name}
              onChange={handleInputChange}
            />
            <label className="fs-5 my-1" htmlFor="company.catchPhrase">
              Enter Catch Phrase:{" "}
            </label>
            <br />
            <input
              id="company.catchPhrase"
              className="w-100 py-1 my-2 px-2"
              type="text"
              placeholder="Catch Phrase"
              value={userDetails.company.catchPhrase}
              onChange={handleInputChange}
            />
            <label className="fs-5 my-1" htmlFor="company.bs">
              Enter BS:{" "}
            </label>
            <br />
            <input
              id="company.bs"
              className="w-100 py-1 my-2 px-2"
              type="text"
              placeholder="BS"
              value={userDetails.company.bs}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-12 my-4 d-flex align-items-center justify-content-end">
            <button
              className="btn btn-success px-5"
              onClick={() =>
                isUpdateMode
                  ? handleEditformSubmit(userDetails.id)
                  : handleSubmit()
              }
            >
              {isUpdateMode ? "Update Form" : "Submit Form"}
            </button>
          </div>
        </div>
        <div className="col-md-6">
          {userData.map((data, index) => (
            <CardItem
              key={index}
              data={data}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
