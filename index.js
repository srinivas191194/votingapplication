const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const DB_HOST = process.env.DB_HOST;

const url = `${DB_HOST}`;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Successfully connected to DB"))
  .catch((e) => console.log(e));
const CompletedSchema = new mongoose.Schema({
  emailid: { type: String, required: true },
  password: { type: String, required: true },
  votestatus: { type: Boolean, required: true, default: false },
});

const CompletedSchema2 = new mongoose.Schema({
  candidateName: { type: String, required: true },
  votes: { type: Number, required: true },
});

const userModel = mongoose.model("userdetails", CompletedSchema);
const candidateModel = mongoose.model("candidatedetails", CompletedSchema2);

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.post("/login", (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  // console.log(username, password);
  userModel.findOne({ emailid: username }, (err, foundUser) => {
    if (!err) {
      if (foundUser) {
        if (foundUser.password === password) {
          const isVoted = foundUser.votestatus;
          res.send({
            status: "200",
            msg: "Login Success",
            email: username,
            votestatus: isVoted,
          });
        } else {
          console.log("fail");
          res.send({ status: "400", msg: "Invalid password" });
        }
      } else {
        res.send({
          status: "400",
          msg: "User dosen't exists please register.",
        });
      }
    } else {
      res.send({ status: "400", msg: "Somethingwent wrong please try again." });
    }
  });
});

app.post("/register", (req, res) => {
  console.log(req.body);
  const username = req.body.email;
  const password = req.body.password;

  userModel.findOne({ emailid: username }, (err, foundUser) => {
    // Check if user already exists
    if (foundUser) {
      res.send({ status: "200", msg: "User Already Exists!" });
    } else {
      // Creating a new user
      const user = {
        emailid: username,
        password: password,
      };
      // saving to DB
      userModel.create(user, (err) => {
        if (!err) {
          res.send({
            status: "200",
            msg: "Registered Successfully!! Please Login. ",
          });
        } else {
          console.log(err);
          res.send({
            status: "400",
            msg: "Registration failed, Please register again.",
          });
        }
      });
    }
  });
});

app.get("/contestents", (req, res) => {
  console.log("fetch");
  candidateModel.find({}, (err, data) => {
    console.log(data);
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

app.post("/cast", (req, res) => {
  // console.log(req.body)
  const id = req.body.id;
  const userEmail = req.body.email;
  console.log(userEmail);
  let votes = 0;

  candidateModel.findOne({ _id: id }, (err, response) => {
    if (!err) {
      votes = response.votes;
      console.log(votes);
      candidateModel.updateOne(
        { _id: id },
        { votes: votes + 1 },
        (err, response) => {
          if (!err) {
            console.log(response);
            userModel.updateOne(
              { emailid: userEmail },
              { votestatus: true },
              (err, updateResponse) => {
                if (!err) {
                  res.send({ status: "200", msg: "Successfully Voted!!" });
                } else {
                  res.send({
                    status: "400",
                    msg: "Something Wrong, Please Vote Again!",
                  });
                }
              }
            );
          }
        }
      );
    } else {
      console.log(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
