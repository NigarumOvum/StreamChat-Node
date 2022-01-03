const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=> {
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
        id: '1',
        name: 'Mike',
        room: 'roomOne'
    }, {
      id: '2',
      name: 'James',
      room: 'roomTwo'
    }, {
      id: '3',
      name: 'John',
      room: 'roomOne'
    }]
  })


  it('should add new user', ()=> {
    // var id = 'asdfasdf';
    // var name = 'myname';
    // var room = 'roomOne'
    var createUser = new Users();
    var user = {
      id: '123',
      name: 'mark',
      room: 'roomOne'
     }
    var resUser = createUser.addUser(user.id, user.name, user.room);
    expect(createUser.users).toEqual([user])
  })


  ///////////////////////////////////////////////////
  it('should return names for node course', ()=>{
    var userList = users.getUserList('roomOne')
    // console.log(userList)

   expect(userList).toEqual(['Mike', 'John']) 
  })


  ///////////////////////////////////////////////////
  it('should return names for react course', () => {
    var userList = users.getUserList('roomTwo')
    // console.log(userList)

    expect(userList).toEqual(['James'])
  })


  ///////////////////////////////////////////////////
  it('should remove a user', ()=>{
    var userId = '1'
    // console.log(users)
    var user = users.removeUser(userId);
    
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  })


  ///////////////////////////////////////////////////
  it('should not remove a user', () => {
    var userId = '5'
    // console.log(users)
    var user = users.removeUser(userId);

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);

  })


  ///////////////////////////////////////////////////
  it('should find a user', () => {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId)
  })


  ///////////////////////////////////////////////////
  it('should not find a user', () => {
    let userId = '4';
    var user = users.getUser(userId);
    expect(user).toBeFalsy()
  })
})
