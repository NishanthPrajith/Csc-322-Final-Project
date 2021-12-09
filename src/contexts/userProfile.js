class Profile {
  constructor(){
    this.name = "";
    this.firstname = "";
    this.lastname = "";
    this.staus = false;
    this.role = -1;
    this.ud = "";
    this.empl = 0;
    this.dob="";
    this.period = 0;
    this.email = "";
    this.gpa = "";
    this.semesterGPA = ""
    this.coursepassed = 0;
  }
  // coursesPassed
  getCoursespassed() {
    return this.coursepassed;
  }
  setCoursespassed(v){
    this.coursepassed=v;
  }

  //SemesterGPA
  getSemesterGPA() {
    return this.semesterGPA;
  }
  setSemesterGPA(v){
    this.semesterGPA=v;
  }

  // GPA
  getGPA() {
    return this.gpa;
  }
  setGPA(v){
    this.gpa=v;
  }
  // EMAIL
  getEmail() {
    return this.email;
  }
  setEmail(v){
    this.email=v;
  }
  // DOB
  getDob() {
    return this.dob;
  }
  setDob(v){
    this.dob=v;
  }
  // EMPL
  getEmpl() {
    return this.empl;
  }
  setEmpl(v){
    this.empl=v;
  }
  // FIRSTNAME
  getFirstname() {
    return this.firstname;
  }
  setFirstname(v){
    this.firstname=v;
  }
  // LASTNAME
  getLastname() {
    return this.lastname;
  }
  setLastname(v){
    this.lastname=v;
  }
  // PERIOD
  getPeriod() {
    return this.period;
  }
  setPeriod(v){
    this.period=v;
  }
  // FULL NAME
  getName() {
    return this.name;
  }
  setName(name){
    this.name=name;
  }
  // STATUS
  getStatus() {
    return this.status;
  }
  setStatus(v) {
    this.status = v;
  }
  // ROLE
  getRole(){
    return this.role;
  }
  setRole(role){
    this.role=role;
  }
  // UIID
  getUd(){
    return this.ud;
  }
  setUd(v){
    this.ud = v;
  }
}

export const userData = new Profile();
