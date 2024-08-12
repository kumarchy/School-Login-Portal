const express = require("express");
const cors = require("cors");
const Parent = require("./config/Parent");
const Student = require("./config/Student");
const Marks = require("./config/Student-marks");
const Fee = require("./config/Fees");
const Pending = require("./config/Pending_status");
const Lectures = require("./config/Lectures");

const Jwt = require('jsonwebtoken');
const jwtkey = 'login-portal';

const connectDB = require('./config/db.js'); // Import the connectDB function
connectDB(); // Connect to MongoDB Atlas

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// student signup API
app.post("/parent_register", async (req, resp) => {
  let user = new Parent(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "something went wrong, Please try after some time" });
    }
    resp.send({ result, auth: token });
  });
});

// parent login API
app.post("/parent_login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await Parent.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ result: "something went wrong, Please try after some time" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send("no data found");
    }
  } else {
    resp.send("no data found");
  }
});

// student signup API
app.post("/register", async (req, resp) => {
  let user = new Student(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "something went wrong, Please try after some time" });
    }
    resp.send({ result, auth: token });
  });
});

// student login API
app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await Student.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ result: "something went wrong, Please try after some time" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send("no data found");
    }
  } else {
    resp.send("no data found");
  }
});

// get progress results API
app.get("/report/:class/:roll_number", verifyToken_parent, async (req, resp) => {
  const { class: className, roll_number } = req.params;
  try {
    let result = await Marks.find({
      class: { $regex: new RegExp(className, 'i') },
      roll_number: { $regex: new RegExp(roll_number, 'i') }
    });
    if (result.length > 0) {
      resp.send(result);
    } else {
      resp.send({ result: "No data found" });
    }
  } catch (error) {
    resp.status(500).send({ error: 'Error fetching data' });
  }
});

// feePost API
app.post("/feePost", async (req, resp) => {
  let user = new Fee(req.body);
  let result = await user.save();
  resp.send(result);
});

// get fee status API
app.get("/feeStatus/:key", verifyToken_parent, async (req, resp) => {
  let result = await Fee.find({
    "$or": [
      { year: { $regex: req.params.key } },
      { month: { $regex: req.params.key } }
    ]
  });
  if (result.length > 0) {
    resp.send(result);
  } else {
    resp.send({ result: "No data found" });
  }
});

// pending post API
app.post("/pending", async (req, resp) => {
  let result = new Pending(req.body);
  result = await result.save();
  resp.send(result);
});

// pending get API
app.get("/pending/:class/:roll_number", verifyToken_parent, async (req, resp) => {
  const { class: className, roll_number } = req.params;
  try {
    let result = await Pending.find({
      class: { $regex: new RegExp(className, 'i') }, // 'i' for case insensitive
      roll_number: { $regex: new RegExp(roll_number, 'i') }
    });
    if (result.length > 0) {
      resp.send(result);
    } else {
      resp.send({ result: "No data found" });
    }
  } catch (error) {
    resp.status(500).send({ error: 'Error fetching data' });
  }
});

// lectures post API
app.post("/lecture", async (req, resp) => {
  let lecture = new Lectures(req.body);
  let result = await lecture.save();
  resp.send(result);
});

// lectures get API
app.get("/lecture/:class/:subject", verifyToken_student, async (req, resp) => {
  const { class: className, subject } = req.params;
  try {
    let result = await Lectures.find({
      class: { $regex: new RegExp(className, 'i') },
      subject: { $regex: new RegExp(subject, 'i') }
    });
    if (result.length > 0) {
      resp.send(result);
    } else {
      resp.send({ result: "No data found" });
    }
  } catch (error) {
    resp.status(500).send({ error: 'Error fetching data' });
  }
});

// fetch rollnumber API
app.get("/rollnumber", verifyToken_parent, async (req, resp) => {
  let result = await Marks.distinct('roll_number');
  resp.send(result);
});

function verifyToken_parent(req, resp, next) {
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(' ')[1];
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with header" });
  }
}

function verifyToken_student(req, resp, next) {
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(' ')[1];
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with header" });
  }
}

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});