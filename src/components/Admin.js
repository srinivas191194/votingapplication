import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

function Admin(props) {
  const location = useLocation();
  const history = useHistory();

  const [flag, setFlag] = useState(false);
  const [users, setusers] = useState([]);

  useEffect(() => {
    const state = location.state;
    if (!state) {
      alert("No Authorization");
      history.push("/");
    } else {
      setFlag(true);
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
          <h1>Candidate</h1>
          <button
            className="btn btn-primary float-end"
            onClick={() => {
              history.push("/");
            }}
          >
            Logout
          </button>
          <div>
            {users ? (
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">No of votes</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((person) => (
                    <>
                      <tr>
                        <td>{person.candidateName}</td>
                        <td>{person.votes}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            ) : (
              <h2>Refresh page...</h2>
            )}
          </div>
        </div>
      ) : (
        <h3 className="text-center mt-5">Loading....</h3>
      )}
    </>
  );
}

export default Admin;
