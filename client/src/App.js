import axios from "axios";
import { useState } from "react";
import logo from "../src/logo.jpg"; // Import the logo image
import "./App.css";

function App() {
  const [services, setServices] = useState([
    {
      name: "Plumber",
      expertise: "Plumbing",
      img: "https://c4.wallpaperflare.com/wallpaper/443/615/705/plumber-kitchen-faucet-wallpaper-preview.jpg",
      price: 50,
    },
    {
      name: "Homemade Cooking",
      expertise: "Homemade Cooking",
      img: "https://www.shutterstock.com/image-photo/mature-muslim-islamic-woman-wife-260nw-1968571531.jpg",
      price: 30,
    },
   ]);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_ynTK8WbTcUUs7s",
      amount: data.amount,
      currency: data.currency,
      name: data.name,
      description: "Service",
      image: data.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8080/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (service) => {
    try {
      const orderUrl = "http://localhost:8080/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: service.price });
      console.log(data);
      initPayment({ ...data.data, name: service.name, img: service.img });
    } catch (error) {
      console.log(error);
    }
  };

   const pairedServices = [];
  for (let i = 0; i < services.length; i += 2) {
    pairedServices.push(services.slice(i, i + 2));
  }

  return (
    <div className="app-container">
      <div className="container">
         <img src={logo} alt="Find Dubai Logo" className="logo" />
         <h1>Multi Services</h1>
        <header className="header">
          <nav>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#career">Career</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </nav>
        </header>

        {/* Marquee with welcome message */}
        <marquee className="marquee">
          Hello everyone, <br />
          Welcome to this wonderful platform where you can find everything you
          need. <br />
          Whether it's information, assistance, products, or just a friendly
          chat, <br />
          we're here to help you out in the best way possible. Feel free to
          explore and make the most of your time here!
        </marquee>

        {/* Mapping through paired services */}
        {pairedServices.map((pair, index) => (
          <div className="service_box" key={index}>
            {/* Rendering each service side by side */}
            {pair.map((service, innerIndex) => (
              <div className="service_container" key={innerIndex}>
                <img
                  src={service.img}
                  alt={`${service.name}_img`}
                  className="service_img"
                />
                <p className="service_name">{service.name}</p>
                <p className="service_expertise">
                  Expert in {service.expertise}
                </p>
                <p className="service_price">
                  Service Charge: <span>&#x20B9; {service.price}</span>
                </p>
                <button
                  onClick={() => handlePayment(service)}
                  className="hire_btn"
                >
                  Hire Now
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

 
