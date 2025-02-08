import { useState } from "react";

import "./App.css";
import { Container, Button,  } from "react-bootstrap";

import musicalstatue from "../src/assets/images/musical statue.jpg";
import samecolor from "../src/assets/images/ball collecting.webp";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import toast ,{Toaster}  from 'react-hot-toast'

const data = [
  { title: "Musical statue", img: musicalstatue },
  { title: "Same color Ball collecting in basket", img: samecolor },
  { title: "Circle In and out", img: "../src/assets/images/circle in and out game.jpg" },
  { title: "Musical Chair", img: "../src/assets/images/musical chair.jpg" },
  { title: "Balloon Blow & Blast", img: "../src/assets/images/balloon blow & blast.jpg" },
  { title: "Lemon and Spoon", img: "../src/assets/images/lemon and spoon.png" },
  { title: "Move Left & Right as per commands", img: "../src/assets/images/move left and right as per commands.jpg" },
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

  const [isSubmitted,setIsSubmitted] =useState(false);

  
  const handleRatingChange = (title, rating) => {
    const newRatings = { ...ratings, [title]: rating };
    setRatings(newRatings);
    console.log(`Game: ${title}, Rating: ${rating}`);
  };
console.log("hello");

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
    console.log(ratings);
    const postRatings = Object.fromEntries(
      Object.entries(ratings).filter(([_, rating]) => rating > 0)
    );
  
    console.log(postRatings);

    const len = Object.entries(postRatings).length;

    if(len===0){
      toast.error('Choose ratings before submitting!!')
      return 
    }
    
    try{ const response = await fetch( "https://meet-fawn-tau.vercel.app/count",{
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(postRatings)
     })

     if(! response.ok){
      console.log(response);
      throw new Error('Failed to Submit FeedBack!')
      
     }

     toast.success("Feedback submitted !!")
     setTimeout(()=>{
      setIsSubmitted(true);
     },1000);

     }
     catch(err){
      console.log(err.message || "Error on submit ")
      toast.error(err.message);
     }
  };


  if(isSubmitted){
    return (
      <Container  fluid style={{height:"100dvh",fontFamily:'fantasy',textAlign:'center',}} className="p-0 thank ">
       
       <div className="layer2 d-flex flex-column align-items-center justify-content-center">
       <p >THANK YOU!</p>
       <p>Feedback submitted successfully..</p>
        </div> 
      </Container>
    )
  }
  return (
    <>
    <Toaster/>
    <Container className="cards m-0 p-0 pb-5" fluid>
      <div className="headings">
        <div className="layer">
          <div>
          <p className="fs-2 text-center fw-bold  ">KPR FAMILY MEET - 2025</p>
          <p className="fs-2 text-center fw-medium ">Feedback Form</p>
          </div>
          <div className="scroll rounded-circle">
             <MdKeyboardDoubleArrowDown size={30}className="m-2" />
             <p>Scroll down</p>
          </div>
        </div>
        
        
      </div>
      

      {/* Regular Games Section */}
      <h3 className="text-center text-decoration-underline d-block mt-4">Kids Games</h3>
      <div className="game-section d-flex flex-column flex-md-row align-items-center">
       
        {data.map((item, ind) => {
          return (
            <div key={ind} className="shadow-sm p-2 my-4 m-md-3 d-inline-flex flex-column  rounded ">
              <div>
                <img src={item.img} width={270} height={270} />
              </div>
              <div>
                <p className="fw-medium m-0 mt-2 fst-italic">{item.title}</p>
                <div className="stars m-0">
                  {renderStars(ratings[item.title], item.title)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Adult Boys Games Section */}
      <h3 className="text-center text-decoration-underline  mt-4">Adult Boys Games</h3>
      <div className="game-section mt-4 d-flex flex-column flex-md-row  align-items-center">
       
        {AdultBoys.map((item, ind) => {
          return (
            <div key={ind} className="shadow-sm p-2 my-4 d-inline-flex flex-column ">
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
      <h3 className="text-center text-decoration-underline    mt-4">Adult Girls Games</h3>
      <div className="game-section mt-4 d-flex flex-column flex-md-row  align-items-center">
       
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
      <h3 className="text-center text-decoration-underline  mt-4">Couples Games</h3>
      <div className="game-section mt-4 d-flex flex-column flex-md-row  align-items-center">
        
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
      <h3 className="text-center text-decoration-underline  mt-4">Senior Citizen Games</h3>

      <div className="game-section mt-4 d-flex flex-column flex-md-row align-items-center">
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
      <div className="text-center m-3 ">
        <Button variant="primary" onClick={handleSubmit}>
          Submit Ratings
        </Button>
      </div>
    </Container>
    </>
  );
}

export default App;