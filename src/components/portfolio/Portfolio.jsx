import React from 'react'
import "./portfolio.css"
import Img1 from "../../assets/wallpaper/1.jpg"
import Img2 from "../../assets/wallpaper/2.jpg"
import Img3 from "../../assets/wallpaper/3.jpg"
import Img4 from "../../assets/wallpaper/4.jpg"
import Img5 from "../../assets/wallpaper/5.jpg"
import Img6 from "../../assets/wallpaper/6.jpg"
const data = [
  {
    id: 1,
    title:"Charts template & Infographie",
    image:Img1,
    github: "https://github.com/",
    demo: "https://dribbble.com/",
  },
  {
    id: 2,
    title:"Charts template & Infographie",
    image:Img2,
    github: "https://github.com/",
    demo: "https://dribbble.com/",
  },
  {
    id: 3,
    title:"Charts template & Infographie",
    image:Img3,
    github: "https://github.com/",
    demo: "https://dribbble.com/",
  },
  {
    id: 4,
    title:"Charts template & Infographie",
    image:Img4,
    github: "https://github.com/",
    demo: "https://dribbble.com/",
  },
  {
    id: 5,
    title:"Charts template & Infographie",
    image:Img5,
    github: "https://github.com/",
    demo: "https://dribbble.com/",
  },
  {
    id: 6,
    title:"Charts template & Infographie",
    image:Img6,
    github: "https://github.com/",
    demo: "https://dribbble.com/",
  },
]

const Portfolio = () => {
  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      <div className="container portfolio__container">
        {
          data.map(({ id, image, title, github, demo }) => {
            return (
              <article className="portfolio__item">
                <div className="portfolio__item-image">
                  <img src={image} alt={title} />
                </div>
                <h3>{title}</h3>
                <div className="portfolio__item-cta">
                  <a href={github} className="btn" target="_blank" >Github</a>  
                  <a href={demo} className="btn btn-primary" target="_blank" >Live Demo</a>  
                </div>
              </article>
            )
          })
        }
      </div>
    </section>
  )
}

export default Portfolio;