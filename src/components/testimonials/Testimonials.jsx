import React from 'react';
import "./testimonials.css";

import AVTR1 from "../../assets/wallpaper/me-withBg.jpg";
import AVTR2 from "../../assets/wallpaper/pixar-3.jpg";
import AVTR3 from "../../assets/wallpaper/pixar-4.jpg";
import AVTR4 from "../../assets/wallpaper/pixar-5.jpg";


const data = [
  {
    avatar: AVTR1,
    name: "Charts template & Infographie",
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Assumenda obcaecati suscipit iure debitis, tempora et repellat sed ad dolores id alias maxime facilis illo perferendis est ipsamdeserunt consequatur sapiente?',
  },
  {
    avatar: AVTR2,
    name: "Charts template & Infographie",
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Assumenda obcaecati suscipit iure debitis, tempora et repellat sed ad dolores id alias maxime facilis illo perferendis est ipsamdeserunt consequatur sapiente?',
  },
  {
    avatar: AVTR3,
    name: "Charts template & Infographie",
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Assumenda obcaecati suscipit iure debitis, tempora et repellat sed ad dolores id alias maxime facilis illo perferendis est ipsamdeserunt consequatur sapiente?',
  },
  {
    avatar: AVTR4,
    name: "Charts template & Infographie",
    review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Assumenda obcaecati suscipit iure debitis, tempora et repellat sed ad dolores id alias maxime facilis illo perferendis est ipsamdeserunt consequatur sapiente?',

  },
]


const Testimonials = () => {
  return (
    <section id="testimonials">
      <h5>Review from clients</h5>
      <h2>Testimonials</h2>

      <div className="container testimonials__container">
        {
          data.map(({ avatar, name, review }, index) => {
            return (
              <article key={index} className="testimonial">
                <div className="client__avatar">
                  <img src={avatar} alt="Avatar one" />
                </div>
                <h5 className="client__name">{name}</h5>
                <small className="client__review">
                  {review}</small>
              </article>
            )
          })
        }
      </div>
    </section>
  )
}

export default Testimonials;