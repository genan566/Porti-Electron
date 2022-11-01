import React from 'react';
import "./contact.css";

import { MdOutlineEmail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";

const Contact = () => {
  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <MdOutlineEmail className="contact__option-icon"/>
            <h4>Email</h4>
            <h5>avodagbejean@gmail.com</h5>
            <a href="mailto:avodagbejean@gmail.com" target="_blank">Send a message</a>
          </article>

          <article className="contact__option">
            <RiMessengerLine className="contact__option-icon"/>
            <h4>Messenger</h4>
            <h5>Jean Avodagbe</h5>
            <a href="https://m.me/jean.avodagbe" target="_blank" >Send a message</a>
          </article>

          <article className="contact__option">
            <BsWhatsapp className="contact__option-icon"/>
            <h4>Whatsapp</h4>
            <h5>+22953239294</h5>
            <a href="https://api.whatsapp.com/send?phone+22953239294" target="_blank">Send a message</a>
          </article>
        </div>
        <form action="">
          <input type="text" name="name" placeholder="Your Full Name" required />
          <input type="email" name="mail" placeholder="Your mail" required />

          <textarea name="message" placeholder="Your message" rows="10"  required></textarea>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact;