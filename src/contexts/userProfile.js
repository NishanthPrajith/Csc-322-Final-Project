class Profile {
  constructor(){
    this.name = "";
    this.staus = false;
    this.role = -1;
    this.ud = "";
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
