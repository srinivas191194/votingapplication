// import axios from "axios";
import React, { usestate } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
function Form() {
  let history = useHistory();

  const handleRegister = (event) => {
    event.preventDefault();
    let variable1 = document.getElementById("exampleInputEmail1").value;
    let variable2 = document.getElementById("exampleInputPassword1").value;
    const formData = {
      email: variable1,
      password: variable2,
    };

    if (variable1 && variable2) {
      axios
        .post("http://localhost:8000/register", formData)
        .then(function (res) {
          alert(res.data.msg);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please enter all details.");
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    let variable1 = document.getElementById("exampleInputEmail1").value;
    let variable2 = document.getElementById("exampleInputPassword1").value;
    const formData = {
      email: variable1,
      password: variable2,
    };
    console.log(formData);
    if (variable1 && variable2) {
      axios.post("http://localhost:8000/login", formData).then(function (res) {
        if (res.data.status == 200) {
          console.log(res.data);
          if (variable1 == "admin@gmail.com") {
            // redirect to adimin page
            history.push({
              state: { email: variable1, password: variable2 },
              pathname: "/admin",
            });
          } else if (res.data.votestatus) {
            alert("Already Voted.");
          } else {
            // redirection to voting
            history.push({
              state: { email: variable1, password: variable2 },
              pathname: "/voting",
            });
          }
        } else {
          alert(res.data.msg);
        }
      });
    } else {
      alert("Enter all details.");
    }
  };

  return (
    <div className="container w-75">
      <h1>Voting Application</h1>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            class="form-control"
            id="exampleInputEmail1"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            class="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary m-4" onClick={handleLogin}>
          Login
        </button>
        <button type="submit" class="btn btn-primary" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}
export default Form;
