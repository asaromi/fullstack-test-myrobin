const { app } = require("../src/app")
const request = require("supertest")
const assert = require("assert")
const { sign: generateJWT } = require("jsonwebtoken")
const { jwtSecret } = require("../config")

describe("Testing Server Begin :", () => {
	let data = { username: "user001", code: "TEST01" }
	let token = generateJWT(data, jwtSecret)
	
  before((done) => {
    app.listen((err) => {
      if (err) return done(err)
      done()
    })


  })

  it("testing index => /", (done) => {
    request(app)
      .get("/")
      .expect(200, (err, res) => {
				if (err) throw err
				assert.equal(res.body.success, true)
				done()
			})
  })

  it("testing joinChatroom => /join", (done) => {
    request(app)
      .post("/join")
			.send({ username: "user001", roomCode: "TEST01" })
      .expect(201, (err, res) => {
				if (err) throw err
				assert.equal(res.body.success, true)
				done()
			})
			.end(done())
  })

	it("testing getActiveChatrooms => /chatroom", (done) => {
    request(app)
      .get("/chatroom")
      .expect(200, (err, res) => {
				if (err) throw err
				assert.equal(res.body.success, true)
				console.log("type body.data (must be "/"array"/") :", typeof res.body.data)
				done()
			})
			.end(done())
  })

	it("testing getChatroomMessages => /chatroom/:roomCode", (done) => {
    request(app)
      .get("/chatroom/TEST01")
			
			.set("vue-token", token)
      .expect(200, (err, res) => {
				if (err) throw err
				assert.equal(res.body.success, true)
				console.log("type body.data (must be "/"array"/") :", typeof res.body.data)
				done()
			})
			.end(done())
  })

	it("testing sendMessage => /chatroom/:roomCode", (done) => {
    request(app)
      .post("/chatroom/TEST01")
			.send({ message: "Ahahayy kira2 gimana pak bos" })
			.set("vue-token", token)
      .expect(201, (err, res) => {
				if (err) throw err
				assert.equal(res.body.success, true)
				console.log("type body.data (must be "/"object"/") :", typeof res.body.data)
				console.log("type body.data.message (must be "/"object"/") :", typeof res.body.data?.message)
				done()
			})
			.end(done())
  })

	it("testing leaveChatroom => /leave", (done) => {
    request(app)
      .get("/leave")
			.set("vue-token", token)
      .expect(200, (err, res) => {
				if (err) throw err
				assert.equal(res.body.success, true)
				console.log(res.body.data.message)
				done()
			})
			.end(done())
  })
})
