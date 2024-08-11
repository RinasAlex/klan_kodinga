import React from 'react'
import './Footer.scss'
import inst from "../../assets/footerImages/inst.png"
import wu from "../../assets/footerImages/wu.png"
import map from "../../assets/footerImages/map.png"

// const Footer = () => {
//   return (
//     <div className="footer">

//       <div className="container">
//         <h1>Contact</h1>
//         <ul className='contacts'>
//           <li className='phone__styles'>
//             <h3>Phone</h3>
//             <p>+49 999 999 99 99</p>
//           </li>
//           <li className='socials__styles'>
//             <h3>Socials</h3>
//             <div className="icon__styles">
//             <img className='inst'src={inst} alt="" />
//             <img className='wu'src={wu} alt="" />
//             </div>
//           </li>
//           <li className='adress__styles'>
//             <h3>Adress</h3>
//             <p>Linkstraße 2, 8 OG, 10 785, Berlin, Deutschland</p>
//           </li>
//           <li className='working__styles'>
//             <h3>Working Hours</h3>
//             <p>24 hours a day</p>
//           </li>
//         </ul>
//         <div className="map">
//           <img className='map__img' src={map} alt="" />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h1>Contact</h1>
        <ul>
          <li className="phone__styles">
            <h3>Phone</h3>
            <p>+49 999 999 99 99</p>
          </li>
          <li className="socials__styles">
            <h3>Socials</h3>
            <div className="social-icons">
              <a href="https://www.instagram.com/" target='_blank'>
                <img src={inst} alt="" />
              </a>
              <a href="https://web.whatsapp.com/" target='_blank'>
                <img src={wu} alt="" />
              </a>
            </div>

          </li>
          <li className="address__styles">
            <h3>Address</h3>
            <p>Linkstraße 2, 8 OG, 10785, Berlin, Deutschland</p>
          </li>
          <li className="working__styles">
            <h3>Working Hours</h3>
            <p>24 hours a day</p>
          </li>
        </ul>
        <div className="map">
        <iframe className='map__styles'
          title="google_map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9713.636886541603!2d13.3750447!3d52.5079329!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1sru!2sde!4v1704283318371!5m2!1sen!2sde"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        </div>

   
      </div>

    </footer >
  );
};

export default Footer;