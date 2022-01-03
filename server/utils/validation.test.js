const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', (req, res)=> {
  it('should allow string with non-space characters', ()=>{
    // var params = {name: '    t e x t ', room: '  1 te x t'}
    //  expect(typeof isRealString(params)).toBeTruthy() 
    var params = isRealString('    text  ')
    expect(params).toBeTruthy()
  })

  it('should reject string with only spaces', ()=> {
    // var params = {name: '         ',   room: '        '}
    //   expect(isRealString(params)).toBeFalsy();
    var params = isRealString('       ')
    expect(params).toBeFalsy()

  })

  it('should reject non-string values', () => {
    // var params = {name: 1, room: 1 }
    // expect(isRealString(params)).toBeFalsy();
    var params = isRealString(98);
    expect(params).toBeFalsy()

  })
})

