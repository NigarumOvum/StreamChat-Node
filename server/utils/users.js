[{
  id: '1',
  name: 'une',
  room: 'Room'
}, {
  id: '2',
  name: 'duex',
  room: 'Room'
}, {
  id: '3',
  name: 'trois',
  room: 'Room'
}


]

// addUser (id, name, room name)
// removeUser(id)
// getUser(id)
// getUserList(id)


class Users {
  constructor() {
    this.users = [];
  }

  //////////////////////////////////////////
  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    // console.log(user)
    return user
  }

  //////////////////////////////////////////
  removeUser(id){
    var user = this.getUser(id);
    // console.log(user)
    if(user){
      this.users = this.users.filter((user) => user.id !== id)
    }
    // console.log(user)
    return user
  }

  //////////////////////////////////////////
  getUser(id){
    return this.users.filter((user) => user.id === id)[0]
  }

  //////////////////////////////////////////
  getUserList(room){
    var users = this.users.filter((user)=>{
      return user.room === room
    })
    var namesArray = users.map((user) => {
      return user.name
    })

    // console.log(namesArray)
    return namesArray
  }




}

module.exports = {Users};