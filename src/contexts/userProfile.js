class Profile {
  constructor(){
    this.name = "";
    this.staus = false;
    this.role = -1;
    this.ud = "";
    this.empl = 0;
    this.period = 0;
  }
  getEmpl() {
    return this.empl;
  }

  setEmpl(v){
    console.log(v)
    this.empl=v;
  }
  getPeriod() {
    return this.period;
  }

  setPeriod(v){
    console.log(v)
    this.period=v;
  }

  getName() {
    return this.name;
  }

  setName(name){
    console.log(name)
    this.name=name;
  }

  getStatus() {
    return this.status;
  }
  
  setStatus(v) {
    this.status = v;
  }

  getRole(){
    return this.role;
  }
  
  setRole(role){
    console.log(role);
    this.role=role;
  }
  getUd(){
    return this.ud;
  }
  setUd(v){
    this.ud = v;
  }
}

export const userData = new Profile();
