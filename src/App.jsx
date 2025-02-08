import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Container, Button } from "react-bootstrap";
import kpr from "../src/assets/images/image1.jpeg";
import musicalstatue from "../src/assets/images/musical statue.jpg";
import samecolor from "../src/assets/images/ball collecting.webp";

const data = [
  { title: "Musical statue", img: musicalstatue },
  { title: "Same color Ball collecting in basket", img: samecolor },
  { title: "Circle In and out", img: "../src/assets/images/circle in and out game.jpg" },
  { title: "Musical Chair", img: "../src/assets/images/musical chair.jpg" },
  { title: "Balloon Blow & Blast", img: "../src/assets/images/balloon blow & blast.jpg" },
  { title: "Lemon and Spoon", img: "../src/assets/images/lemon and spoon.png" },
  { title: "Move Left and Right as per commands", img: "../src/assets/images/move left and right as per commands.jpg" },
  { title: "Musical find", img: "../src/assets/images/find music game.jpg" },
  { title: "Cup and balloon lifting.", img: "../src/assets/images/Cup and ball hitting.png" },
  { title: "Cup arrangement as Hill.", img: "../src/assets/images/cup arrangements as hill.jpg" },
];

const seniorCitizen = [
  { title: "Slow walking", img: "../src/assets/images/slow walk.jpg" },
  { title: "Antakshari", img: "../src/assets/images/anthakshari.jpg" },
  { title: "Finding old songs", img: "../src/assets/images/oldsongs.jpg" },
  { title: "5 stones", img: "../src/assets/images/fivestones.jpg" },
];

const AdultBoys = [
  { title: "Arm wrestling", img: "../src/assets/images/arm wrestling game.jpg" },
  { title: "Cup and ball hitting", img: "../src/assets/images/Cup and ball hitting.png" },
  { title: "Bat and ball hitting in one hand(boys)", img: "../src/assets/images/Bat and ball hitting in one hand.jpg" },
];

const AdultGirls = [
  { title: "Dump charades", img: "../src/assets/images/Dump charades.jpg" },
  { title: "Bat and ball hitting in one hand (girls)", img: "../src/assets/images/Bat and ball hitting in one hand (g).jpg" },
  { title: "Blowing small ball in series of water cups", img: "../src/assets/images/Blowing small ball.jpg" },
];

const couples = [
  { title: "Ball/balloon between heads", img: "../src/assets/images/Ball and balloon between heads.webp" },
  { title: "Compatibility round", img: "../src/assets/images/Compatibility round.webp" },
  { title: "Paper dance", img: "../src/assets/images/paper dance.jpg" },
  { title: "Flour passing with cards", img: "../src/assets/images/flour.jpg" },
];

function App() {
  // Initialize ratings as an object with title: rating pairs
  const [ratings, setRatings] = useState(
    data.reduce((acc, curr) => {
      acc[curr.title] = 0; // Default rating is 0 for each game
      return acc;
    }, {})
  );

  const handleRatingChange = (title, rating) => {
    const newRatings = { ...ratings, [title]: rating };
    setRatings(newRatings);
    console.log(`Game: ${title}, Rating: ${rating}`);
  };

  const renderStars = (rating, title) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? "filled" : ""}`}
          onClick={() => handleRatingChange(title, i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Handle submit button click
  const handleSubmit = async() => {
     const response = await fetch( "https://meet-fawn-tau.vercel.app/count",{
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(ratings)
     })

     const resJson = await response.json();
     
     if(! response.ok){
      console.log(resJson);
      
     }
  };

  return (
    <Container className="">
      <div className="headings">
        <p className="fs-2 text-center fw-bold text-white ">KPR FAMILY MEET -2025</p>
        <p className="fs-2 text-center fw-medium text-white">Feedback Form</p>
        <i className="fa fa-arrow-down"/>
      </div>
      

      {/* Regular Games Section */}
      <div className="game-section d-flex flex-column align-items-center">
        <h3 className="text-center text-decoration-underline  mt-4">Kids Games</h3>
        {data.map((item, ind) => {
          return (
            <div key={ind} className="shadow p-2 my-4 d-inline-flex flex-column ">
              <div>
                <img src={item.img} width={270} height={270} />
              </div>
              <div>
                <p className="fw-medium m-0 mt-2">{item.title}</p>
                <div className="stars m-0">
                  {renderStars(ratings[item.title], item.title)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Adult Boys Games Section */}
      <div className="game-section mt-4 d-flex flex-column align-items-center">
        <h3 className="text-center text-decoration-underline  mt-4">Adult Boys Games</h3>
        {AdultBoys.map((item, ind) => {
          return (
            <div key={ind} className="shadow p-2 my-4 d-inline-flex flex-column ">
              <div>
                <img src={item.img} width={270} height={270}/>
              </div>
              <div>
                <p className="fw-medium m-0 mt-2">{item.title}</p>
                <div className="stars">
                  {renderStars(ratings[item.title], item.title)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Adult Girls Games Section */}
      <div className="game-section mt-4 d-flex flex-column align-items-center">
        <h3 className="text-center text-decoration-underline  mt-4">Adult Girls Games</h3>
        {AdultGirls.map((item, ind) => {
          return (
            <div key={ind} className="shadow p-2 my-4 d-inline-flex flex-column ">
              <div>
                <img src={item.img} width={270} height={270}/>
              </div>
              <div>
                <p className="fw-medium m-0 mt-2">{item.title}</p>
                <div className="stars">
                  {renderStars(ratings[item.title], item.title)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Couples Games Section */}
      <div className="game-section mt-4 d-flex flex-column align-items-center">
        <h3 className="text-center text-decoration-underline  mt-4">Couples Games</h3>
        {couples.map((item, ind) => {
          return (
            <div key={ind} className="shadow p-2 my-4 d-inline-flex flex-column ">
              <div>
                <img src={item.img} width={270} height={270} />
              </div>
              <div>
                <p className="fw-medium m-0 mt-2">{item.title}</p>
                <div className="stars">
                  {renderStars(ratings[item.title], item.title)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Senior Citizen Games Section */}
      <div className="game-section mt-4 d-flex flex-column align-items-center">
        <h3 className="text-center text-decoration-underline  mt-4">Senior Citizen Games</h3>
        {seniorCitizen.map((item, ind) => {
          return (
            <div key={ind} className="shadow p-2 my-4 d-inline-flex flex-column ">
              <div>
                <img src={item.img} width={270} height={270} />
              </div>
              <div>
                <p className="fw-medium m-0 mt-2">{item.title}</p>
                <div className="stars">
                  {renderStars(ratings[item.title], item.title)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Bootstrap Submit Button */}
      <div className="text-center m-3 mb-5">
        <Button variant="primary" onClick={handleSubmit}>
          Submit Ratings
        </Button>
      </div>
    </Container>
  );
}

export default App;
