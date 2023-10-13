import React from "react";
import "../../styles/landing.css";
import HeaderLanding from "../component/headerLanding";
import Reasons from "../component/reasons";
import OurServices from "../component/ourServices"
import Testimonial from "../component/testimonial";
import FooterLanding from "../component/footerLanding";

export const Landing = () => {

  return (
    <div className="landing">
      <HeaderLanding />
      <OurServices />
      <Reasons />
      <Testimonial />
      <FooterLanding />
    </div>

  )
};
