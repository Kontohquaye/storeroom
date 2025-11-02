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
          <h2>Step 2</h2>
          <img
            style={{
              height: "100px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center -70px",
              borderRadius: "15px",
              marginTop: "1em",
            }}
            src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
          />
          <p>Custom step content!</p>
        </Step>
        <Step>
          <h2>How about an input?</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name?"
          />
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
