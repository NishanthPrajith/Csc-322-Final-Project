

class Profile {
  constructor(){
    this.name = "";
    this.staus = false;
    this.role = -1;
  }

  getName() {
    return this.name;
  }

  getStatus() {
    return this.status;
  }
  getRole(){
    return this.role;
  }
  setRole(role){
    console.log(role);
    this.role=role;
  }
  setName(name){
    console.log(name)
    this.name=name;
  }
  setStatus(v) {
    this.status = v;
  }
}

export const userData = new Profile();
