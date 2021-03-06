import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import Table from "./Table";

function Voting(props) {
  const location = useLocation();
  const history = useHistory();

  const [flag, setFlag] = useState(false);
  const [users, setusers] = useState([]);
  const [userEmail, setEmail] = useState("");

  useEffect(() => {
    const state = location.state;
    if (state) {
      const email = state.email;

      console.log("email:" + email);
      setFlag(true);
      setEmail(email);
      console.log(email);
    } else {
      history.push("/");
    }

    // fetch the candidates
    axios
      .get("http://localhost:8000/contestents")
      .then((res) => setusers(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      {flag ? (
        <div className="container">
          <h1>Candidates</h1>
          <button
            className="btn btn-primary float-end"
            onClick={() => history.push("/")}
          >
            Logout
          </button>
          <div>
            {users ? (
              <Table data={users} email={userEmail} />
            ) : (
              <h2>Refresh page...</h2>
            )}
          </div>
        </div>
      ) : (
        <h3 className="text-center">Loading....</h3>
      )}
    </>
  );
}

export default Voting;
