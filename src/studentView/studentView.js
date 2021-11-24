import './studentView.css'
import { userData } from '../contexts/userProfile';
import { useState, useEffect, useRef } from 'react';
import React from 'react'
import { db } from "../firebase.js";
import { useHistory } from 'react-router-dom';
import Tabs from '../components/Tabs';
import { getDoc,collection,onSnapshot, setDoc,doc,addDoc, updateDoc } from '@firebase/firestore';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import { FaStar } from "react-icons/fa";
import ComplainPopup from './studentcomplainPopup';
import ComplaintPopup from './complainPopup';
import RatePopup from './ratePopus';

var instUid;
var course;
var InstructorTable;
var complainUiid;
export default function StudentView() {
    const taboowords = ["shit","dang","damn"];
   const history = useHistory();
   const instname = useRef();
   const classname = useRef(); 
   const experience = useRef();  
   const complaint = useRef();
   const [Student, setStudent] = useState('');
   const [CurrentClasses, setCurrentClasses] = useState([]);
   const [Instructor, setInstructor] = useState([]);
   const [complainpopup, setIsOpen] = useState(false);
   const [complainpopup1, setIsOpen1] = useState(false);
   const [ratepopus, setrateIsOpen] = useState(false);
   const [Warnings, setWarnings] = useState([]);
   const [ClassStudents, setClassStudents] = useState([]);
   const [Loading, setLoading] = useState('false');
   const [InputValue, setInputValue] = useState('');
   const [OptionSelected, setOptionSelected] = useState("schedule");
   const instructorRef = useRef();
   const courseRef = useRef();
   const options = [{label: "Schedule", value: "schedule"}, {label:"Record", value: "record"}, {label: "Drop", value: "drop"} , 
                    {label: "Enroll", value: "enroll"}, {label:"Grades", value: "grades"}, {label: "Complaints", value: "complaints"}, 
                    {label: "Rate", value: "rate"}, {label: "Warning", value: "warning"}];

    const handleInputChange = value => {
      setInputValue(value);
  }

  const handleChange = value => {
    setOptionSelected(value);
  }
  // complainpopup
  const complainPopUp = () => {
    setIsOpen(!complainpopup);
    }
  async function complainclosePopUp () {
    setIsOpen(!complainpopup);
    }

    // complainpopup1
  const complainPopUp1 = () => {
    setIsOpen1(!complainpopup1);
    }
  async function complainclosePopUp1 () {
    setIsOpen1(!complainpopup1);
    }

    // ratepopup
  const ratePopup = (a,b) => {
    course = a;
    instUid = b; 
    setrateIsOpen(!ratepopus);
    }

  async function closeratePopup () {
    setrateIsOpen(!ratepopus);
    }

    async function getStudentCourses(db) {
        const coursesCol = collection(db, 'Students', userData.getUd(),"Courses");
        setLoading(true);
       onSnapshot(coursesCol, (querySnapshot) => {
          const student = [];
          querySnapshot.forEach((doc) => {
              student.push(doc.data());
          });
          console.log(student);
          setCurrentClasses(student);
        });
        setLoading(false);
      }
    
    async function getWarnings(db){
        const warnCol = collection(db, 'Students');
        setLoading(true);
       onSnapshot(warnCol, (querySnapshot) => {
          const warning = [];
          querySnapshot.forEach((doc) => {
              warning.push(doc.data());
          });
          console.log(warning);
          setWarnings(warning);
        });
        setLoading(false);
     }

     async function getInstructor1(db) {
        const complainsCol = collection(db, 'Instructor');
        setLoading(true);
       onSnapshot(complainsCol, (querySnapshot) => {
          const complain = [];
          querySnapshot.forEach((doc) => {
              complain.push(doc.data());
          });
          console.log(complain);
          setInstructor(complain);
        });
        setLoading(false);
      }
    
    async function getCourses(db){
            
        
            function la(src){
            console.log(src); 
            }
        }

    async function getRoster(db){

        // var e = document.getElementById("dd1");
        // var strUser = e;
        // console.log(strUser); // en
    
        function la(src){
        console.log(src); 
        }                    
    }
    async function Complain(a,b){
        // Get the Instructor
        const docRef = doc(db, "Instructor", b);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        InstructorTable = docSnap
        console.log("Document data:", docSnap.data());
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
        // Get the students in the class
        const stuCol = collection(db, 'Instructor',b,"Courses",a,"Roster");
        setLoading(true);
        onSnapshot(stuCol, (querySnapshot) => {
        const complain = [];
        querySnapshot.forEach((doc) => {
            complain.push(doc.data());
        });
        
        console.log(complain);
        for(let i = 0; i<complain.length; i++){
            for(let j = 0; j<Warnings.length; j++){
                if(complain[i].Student===Warnings[j].useruiid){
                    complain[i].StudentName = Warnings[j].firstname + " " + Warnings[j].lastname
                }
                else if(complain[i].Student=== userData.getUd()){
                    continue;
                }
            }
        }
        setClassStudents(complain);
        });
        setLoading(false);
    complainPopUp();
}
    async function Complain1(a){
        // check
        if(a === userData.getUd()){
            alert("You cannot complain on yourself!")
            await history.push('StudentView')
        }
        else{
        complainUiid = a;
        for(let i = 0; i<Instructor.length; i++){
            if(Instructor[i].useruiid===a){
                complainUiid = Instructor[i].firstname + " " + Instructor[i].lastname;
            }
        }
        for(let i = 0; i<Warnings.length; i++){
            if(Warnings[i].useruiid===a){
                complainUiid = Warnings[i].firstname + " " + Warnings[i].lastname;
            }
        }
        complainPopUp1();
    }
}
    async function Rate(a,b){
        ratePopup(a,b);
    }
    async function submitreview(){
        // average formula 
        for(let i = 0; i<Instructor.length; i++){
            if(Instructor[i].useruiid === instUid){
                var fullname = Instructor[i].firstname + " " + Instructor[i].lastname;
                  let t_total = (Instructor[i].Review) * (Instructor[i].numReview);
                  let new_total = (t_total) + (currentValue);
                  var new_updated_total = (new_total)/((Instructor[i].numReview) + 1);
                  const updated_num_review = ((Instructor[i].numReview) + 1);
                  const washingtonRef = doc(db, "Instructor", Instructor[i].useruiid);
                  // Set the "capital" field of the city 'DC'
                  await updateDoc(washingtonRef, {
                  Review: new_updated_total,
                  numReview: updated_num_review
                  });
            }
        }
        // check for taboo words and give them a warning 
        let check = document.getElementById("input-details").value
        check = check.split(' ');
        let count = 0;
        console.log(check);
        for(let i = 0; i<check.length; i++){
            if(taboowords.includes(check[i])){
                check[i] = "*";
                ++count;
            }
        }
        check = check.join(" ");
        if(count<3){
            // author recieves one warning 
            for(let i = 0; i<Warnings.length; i++){
                if(Warnings[i].useruiid === userData.getUd()){
                    var warncount = Warnings[i].numWarn;
                    warncount += 1;
                    const washingtonRef = doc(db, "Students",userData.getUd());
                // Set the "capital" field of the city 'DC'
                await updateDoc(washingtonRef, {
                    numWarn: warncount
                });
              }
            }
            // add the doc to the warnings
            await addDoc(collection(db, "Students",userData.getUd(),"Warnings"), {
                Warn: "You have been given one warnings for taboo words",
                numofWarn: 1
              });              
            await addDoc(collection(db, "Reviews"), {
                SentByUIID: userData.getUd(),
                SentBy: userData.getFirstname()+ " "+ userData.getLastname(),
                Course: course,
                InstructorName: fullname,
                InstructorUiid: instUid,
                InstructoravgReview: (new_updated_total).toFixed(2),
                Rating: currentValue,
                Review: check 
              });
              alert("Review submitted, Thank you for your Feedback!");
              closeratePopup();
        }
        if (count>=3){
           // author recieves two warning 
           for(let i = 0; i<Warnings.length; i++){
            if(Warnings[i].useruiid === userData.getUd()){
                var warncount = Warnings[i].numWarn;
                warncount += 2;
                const washingtonRef = doc(db, "Students",userData.getUd());
                // Set the "capital" field of the city 'DC'
                await updateDoc(washingtonRef, {
                    numWarn: warncount
                });
            }
          }
          // add the doc to the warnings
          await addDoc(collection(db, "Students",userData.getUd(),"Warnings"), {
            Warn: "You have been given two warnings for taboo words",
            numofWarn: 2
          });
          alert("You have too many taboo words, review failed to submit unsuccessfully");
          await history.push('Studentview');
        }
    }

    async function submitComplaint(){
        await addDoc(collection(db, "Complaints"), {
            SentBy: userData.getFirstname()+ " "+ userData.getLastname(),
            IssuedName: complainUiid,
            Complaint: document.getElementById("input-details").value 
          });
          alert("Complaint submitted, Thank you for your Feedback!");
          await history.push('Studentview');  
    }

 useEffect(() => {
    setLoading(true);
    getStudentCourses(db);
    getWarnings(db);
    getInstructor1(db);
  }, []);


  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    console.log(value)
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const colors = {
    violet: "#c722e0",
    grey: "#a9a9a9",  
    };

    return (
        <div className ='studentPage'>
        <h1 className= "noselect" style = {{color: "White"}}>Welcome!</h1>
         
        <Container className = "Dropdown" maxWidth = "false">
                <div> 
                    <div className='Card2'>
                        <div className = "upper-container2">  
                            <div className='image-container'>
                                <img src= "https://www.logolynx.com/images/logolynx/ab/ab3cf43cb423c7d9c20eadde6a051a5d.jpeg" alt='' height="100px" width="100px"/>
                            </div>    
                        </div>
                        <div className="lower-container2">
                            <h2>Selection Menu</h2>
            
                            <Select className ="Selection" options = { options } value ={OptionSelected} onInputChange = {handleInputChange} onChange = {handleChange}>
                            </Select>
                        </div>
                    </div>
                </div>    
        </Container>    

        <Container className = "MyInfo" maxWidth = "false">
            <div className ="MyInfo">
                    <div className='Card'>
                    <div className='upper-container'>
                            <div className='image-container2'>
                                <img src= "https://i.pravatar.cc/150?img=56" alt='' height="100px" width="100px"/>
                            </div>
                    </div>
                    <div className="lower-container">
                            <h3>Student Information</h3>
                            <p>First Name: {userData.getFirstname()}</p>
                            <p>Last Name: {userData.getLastname()}</p>
                            <p>Date of Birth: {userData.getDob()}</p>
                            <p>GPA: {userData.getGPA()}</p>
                            <p>EMPL: {userData.getEmpl()}</p>
                            <p>Email: {userData.getEmail()}</p>
                    </div>
                </div>
            </div> 
        </Container>
        <Container className= "Display" maxWidth = "false" >
            <div className= "Display" style={{ backgroundColor: "white", height: '80vh' , width: '150vh'}}>
                {OptionSelected.value === "schedule" && <table className = "CourseStyler">
                                <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                    <th>Section</th>
                                    <th> Instructor</th>
                                </tr>
                            { CurrentClasses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                    <td> { Class.Secion } </td>
                                    <td> {Class.Instructor } </td>
                                </tr>
                            ))}
                        </table>    
                        }  
                     
                        {(OptionSelected.value === "record") && <table className>
                                <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                </tr>
                            { CurrentClasses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                </tr>
                            ))}
                        </table>    
                        }   
                        
                        {(OptionSelected.value === "drop") && <table className>
                                <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                </tr>
                            { CurrentClasses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                </tr>
                            ))}
                        </table>    
                        }
                        
                        {(OptionSelected.value === "enroll") && <table className>
                                <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                </tr>
                            { CurrentClasses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                </tr>
                            ))}
                        </table>    
                        }

                        {(OptionSelected.value === "grades") && <table className>
                                <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                </tr>
                            { CurrentClasses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                </tr>
                            ))}
                        </table>    
                        }

                        {(OptionSelected.value === "complaints") && <table className = "CourseStyler">
                                <tr>
                                    <th>Name</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                    <th>Section</th>
                                    <th>Instructor</th>
                                </tr>
                            {CurrentClasses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                    <td> { Class.Secion } </td>
                                    <td> {Class.Instructor } </td>
                                    <td><button onClick={() => Complain(Class.Class,
                                                                        Class.Instructoruiid 
                                    )}className="button">Complain</button></td>
                                </tr>
                            ))}
                        </table>    
                        }       
                        {(OptionSelected.value === "rate") && <table className = "CourseStyler">
                                <tr>
                                    <th>Class</th>
                                    <th>Time</th>
                                    <th>Room</th>
                                    <th>Section</th>
                                    <th> Instructor</th>
                                </tr>
                            { CurrentClasses.map((Class) => (
                                <tr>
                                    <td> { Class.Class } </td>
                                    <td> { Class.DayTime } </td>
                                    <td> { Class.Room } </td>
                                    <td> { Class.Secion } </td>
                                    <td> {Class.Instructor } </td>
                                    <td><button className="rate-button"onClick = {() => Rate(Class.Class, 
                                                                      Class.Instructoruiid                                  
                                                                     )}>Rate</button></td>
                                </tr>
                            ))}
                        </table>     
                        }   
                
                        {(OptionSelected.value === "warning") && <div className="warning-page">
                            <h1>Total Warnings:</h1>
                            <p>Reminder: Getting 3 warnings will result in a suspension!</p>
                                <table className ="CourseStyler-warning">
                                    <tr>
                                        <th>Amount</th>
                                        <th>Reason</th>
                                    </tr>
                                    { Warnings.map((warn) => (
                                        <tr>
                                            <td> { warn.warn } </td>
                                        </tr>
                                    ))}
                                </table>   
                        </div> 
                        }    
                </div>
            </Container>  

      
        {complainpopup && <ComplainPopup
            content={<>
                <table className="xCourses">
                    <h1>Instructor</h1>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
                                <tr>
                                    <td> { InstructorTable.data().firstname+ " " + InstructorTable.data().lastname } </td>
                                    <td><button onClick = {() => Complain1(InstructorTable.data().useruiid                              
                                                                     )}className="button">Complain</button></td>
                                </tr>
                </table>
                <table className="xCourses">
                    <h1>Students</h1>
                <tr>
                    <th>Name</th>
                    <th></th>
                </tr>
                { ClassStudents.map((Class) => (
                                <tr>
                                    <td> { Class.StudentName } </td>
                                    <td><button onClick = {() => Complain1(Class.Student                                
                                                                     )}className="button">Complain</button></td>
                                </tr>
                            ))}
                </table>
            </>}
            handleClose={complainclosePopUp}
            />}
        
        {complainpopup1 && <ComplaintPopup
            content={<>
                <div className="complaint"style={styles.container}>
                        <h2> Complaint </h2>
                            <textarea className="input-details"id="input-details"ref={complaint} placeholder="Describe your issue." style={styles.textarea} />
                            <button onClick ={submitComplaint} className="button"> Submit </button>  
                        </div>
            </>}
            handleClose={complainclosePopUp1}
            />} 
        {ratepopus && <RatePopup
            content={<>
                <div className="rating"style={styles.container}>
                            <h2> Ratings </h2>
                            <div style={styles.stars}>
                            {stars.map((_, index) => {
                                return (
                                    <FaStar
                                    key={index}
                                    size={24}
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    color={(hoverValue || currentValue) > index ? colors.violet : colors.grey}
                                    style={{
                                        marginRight: 10,
                                        cursor: "pointer"
                                    }}
                                    />
                                )
                             })}
                            </div>
                                <textarea className="input-details" id="input-details"ref={experience} placeholder="What's your experience?" style={styles.textarea} />
                            <button onClick = {submitreview}className="button"> Submit </button>
                     </div> 
            </>}
            handleClose={closeratePopup}
            />}                    
    </div>
    );
}

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300
    },
    textarea2: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "10px 0",
        minHeight: 40,
        width: 100
    },
  };


