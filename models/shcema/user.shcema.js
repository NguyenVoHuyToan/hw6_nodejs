class User {
  constructor(new_database) {
    this.email = new_database.email;
    this.password = new_database.password;
  }
}
export default User