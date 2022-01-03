const expect = require('expect')

let { generateMessage, generateLocationMessage } = require('./message');


describe('generateMessage', (req, res) => {
  it('should generate correct message object', ()=>{  
    let from = 'sample';
    let text = 'sample';
    // let createdAt = new Date().getTime()
    let message = generateMessage(from, text);
    // console.log(message)

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
    // // expect(obj.text).toBe('this is your text');

    // done();

  })



  describe('generateLocationMessage', (req, res)=>{
    it('should generate location object', ()=>{
     let from = 'sample';
     let lat = 1;
     let long = 1

     let genLoc = generateLocationMessage(from, lat, long);

     expect(genLoc.from).toBe(from);
     expect(genLoc.url).toBe(`http://www.google.com/maps?q=${lat},${lat}`);
     expect(typeof genLoc.createdAt).toBe('number')
      


    })

  })

})