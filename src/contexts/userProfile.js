

class Profile {
  constructor(){
    this.name = "";
    this.checknull = true;
  }

  getName() {
    return this.name;
  }

  getStatus() {
    return this.checknull;
  }

  setName(auth) {
    if(auth.currentUser != null) {
      this.name = auth.currentUser.displayName;
      this.checknull = false;
    } else {
      this.name = "";
      this.checknull = true;
    }
  }
}

export const userData = new Profile();
