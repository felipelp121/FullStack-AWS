import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Auth } from "aws-amplify";

export default function PrivateRoute({ children }) {
  const [response, setResponse] = useState(true);
  useEffect(
    (children) => {
      if (response) {
        return children;
      }
    },
    [response]
  );
  Auth.currentSession()
    .then(() => {
      setResponse(true);
    })
    .catch(() => {
      setResponse(false);
    });
  return response ? children : <Navigate to="/" />;
}
