import React, { useEffect } from "react";
import { useFormik } from "formik";
import validate from "..//..//components/auth/validate";
import { IconContext } from "react-icons";
import axios from "axios";

import { 
    FaFacebook, 
    FaTwitterSquare, 
    FaInstagramSquare, 
    FaPhoneAlt,
    FaEnvelope
} from "react-icons/fa";
import { BiMap } from "react-icons/bi";

import bgImg from "..//..//components/assets/socialImageTwo.png";


import styles from "./signup.module.css";

const Signup = () => {

    const formik = useFormik({

        initialValues: {
          users: [],
          fullName: "",
          email: "",
          password: "", 
          comment: "",
          date: new Date()
        },
        validate, 
        onSubmit: (values) => {
            console.log(values)
            axios.post('http://localhost:3000/api/auth/signup', values)
            .then(response => console.log(response.data))
            window.location = '/'
        },
      });
 
      
    return (
        <React.Fragment>

            <div className="container">
                <div className="row">
                    <div className="col col-md-5 mt-5">
                    <h1 className={styles.h1}>Let's talk.</h1>
            <p className="text-muted mt-3">To request a quote or want to meet up for coffee. <br/>
               contact us directly or fill out the form and we will get back to you promptly.
            </p>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label for="name"  className="text-muted">Your Name</label>
                    <input 
                    type="text"
                     className="form-control" 
                     name="fullName"
                     style = {{   backgroundColor: "#eee",
                     borderRadius: "30px"}}
                     {...formik.getFieldProps("fullName")}
                     />
                       {formik.touched.fullName && formik.errors.fullName ? (
              <div>{formik.errors.fullName}</div>
            ) : null}
                </div>

                <div className = "form-group">
                    <label for="email"  className="text-muted">Your Email</label>
                    <input
                     type="email" 
                     className="form-control rounded-0" 
                     name="email"
                     style = {{   backgroundColor: "#eee",
                     borderRadius: "30px"}}
                     {...formik.getFieldProps("email")}
                    
                     />
                    <small id="emailHelp" className="form-text text-muted">We 'll never share your email without your notice.</small>
                    {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
                </div>

                <div className = "form-group">
                    <label for="comment"  className="text-muted">Your Message</label> <br></br>
                    <textarea 
                    className="form-control p-3" 
                    placeholder="Type someething if you want...."
                     cols="4" 
                     row="10"
                     name="comment"
                     {...formik.getFieldProps("comment")}
                     style = {{   backgroundColor: "#eee",
                     borderRadius: "30px"}}
                     >
                     </textarea>
                     {formik.touched.comment && formik.errors.comment ? (
              <div>{formik.errors.comment}</div>
            ) : null}
                </div>

                <button type="submit" className="btn btn-primary"> Send Message</button>
                <button type="submit" className="btn btn-outline-primary ml-5">Log in</button>
            </form>
        

                    </div>
                    <div className="col-md-1 mx-auto">
                    </div>
                    <div className="col-md-6 mx-auto">
                        <img src={bgImg} alt="Social Messaging" />

                      <div>
                      <IconContext.Provider value={{ color: 'gray' }}> <BiMap />  </IconContext.Provider> <span className="text-muted">151 New Park Ave, Hartford, CT 06106 <br></br> <span className={{paddingLeft: "20px"}}>United States</span>  <br></br></span>
                      <IconContext.Provider value={{ color: 'gray' }}><FaPhoneAlt />  </IconContext.Provider><span className="text-muted">1 (203)-302-9545 <br></br></span> 
                      <IconContext.Provider value={{ color: 'gray' }}><FaEnvelope /> </IconContext.Provider> <span className="text-muted">contactus@inveritasoft.com </span>  
                      </div>

                      <div className = {styles.icons}>
                          <IconContext.Provider value={{ className: "mr-3 mt-5", color: 'blue'}}>
                          <FaFacebook />
                          </IconContext.Provider>
                          <IconContext.Provider value={{ className: "mr-3 mt-5", color: 'cyan'}}>
                          <FaTwitterSquare />
                          </IconContext.Provider>
                          <IconContext.Provider value={{ className: "mr-3 mt-5", color: 'violet'}}>
                          <FaInstagramSquare />
                          </IconContext.Provider>
                       
                      </div>

                    </div>
                </div>
               
            </div>
            
        </React.Fragment>
    )
}

export default Signup