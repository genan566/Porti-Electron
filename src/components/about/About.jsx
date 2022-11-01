import React from 'react'
import Me from "../../assets/wallpaper/me-withBg.jpg";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";
import './about.css'; 


const About = () => {
  return (
    <section id="about">
      <h5>Get to know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <img src={Me} alt="About Image" className="about__me-image" />
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>3+ Years Woring</small>
            </article>

            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5>Clients</h5>
              <small>200+ Worldwide</small>
            </article>

            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>80+ Completed</small>
            </article>
          </div>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Labore consequuntur sint cupiditate optio alias ducimus sunt, harum repudiandae fuga ratione suscipit, aspernatur sapiente
            quis sequi. Deleniti itaque voluptatem repellat suscipit.</p>

            <a href="#" className="btn btn-primary">Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About;