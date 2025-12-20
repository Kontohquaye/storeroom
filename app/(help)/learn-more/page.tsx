"use client";
import { useState } from "react";
import Stepper, { Step } from "@/components/Stepper";
import { redirect, RedirectType } from "next/navigation";

const LearnMore = () => {
  const [name, setName] = useState("");
  return (
    <div className="content">
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log(step);
        }}
        onFinalStepCompleted={() => redirect("/dashboard", RedirectType.push)}
        backButtonText="Previous"
        nextButtonText="Next"
      >
        <Step>
          <h2>Getting started with storeroom😎</h2>
          <p>
            Check out <b>store creation</b> in the next step!
          </p>
        </Step>
        <Step>
          <h2>Creating a store</h2>
          <img
            style={{
              height: "200px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center -70px",
              borderRadius: "15px",
              marginTop: "1em",
            }}
            src="https://files.edgestore.dev/9fafx9jpqygtarv1/storeroomDocs/_public/ae8ec318-00da-4825-ad09-77c5c766b358.webp"
          />
          <p>Click on create store and provide details!</p>
        </Step>
        <Step>
          <h2>Adding Items</h2>
          <img
            style={{
              height: "100px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center 10px",
              borderRadius: "15px",
              marginTop: "1em",
            }}
            src="https://files.edgestore.dev/9fafx9jpqygtarv1/storeroomDocs/_public/da2cc48a-4620-457d-bee8-1819469ad9c8.webp"
          />
          <p>Click on add items and fill in the details</p>
          <p>
            In stock must be all items in good state excluding the damaged ones
          </p>
        </Step>
        <Step>
          <h2>Congratulations on completion🥳🥳</h2>
          <p>You made it!</p>
        </Step>
      </Stepper>
    </div>
  );
};

export default LearnMore;
