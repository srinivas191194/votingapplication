import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Table({ data, email }) {
  let history = useHistory();
  async function handleSubmit(id) {
    const headers = {
      "Content-Type": "application/json",
    };
    const candidateId = {
      id: id,
      email: email,
    };
    const res = await axios.post(
      "https://voting-server-application.herokuapp.com/cast",
      candidateId,
      {
        headers,
      }
    );
    alert(res.data.msg);
    history.push("/");
  }

  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">First</th>
          <th scope="col">Vote</th>
        </tr>
      </thead>
      <tbody>
        {data
          ? data.map((person) => (
              <tr>
                <td>{person.candidateName}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleSubmit(person._id)}
                  >
                    Vote
                  </button>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
}

export default Table;
