import React, { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const data = { email, password };

    try {
      const response = await fetch("https://hlomail.sanjaysagar.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Save the token in the cookies
        Cookies.set("token", responseData.token);
        alert(responseData.token)
        // Redirect to the dashboard
        window.location.href =
          "https://hlomail-frontend.sanjaysagar.com/dashboard";
      } 
      else if (response.status==401){
        setErrorMessage(
          responseData.message || "Incorrent username or password"
        );
      }
      else {
        setErrorMessage(
          responseData.message || "An error occurred during login"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <main className="vh-100 d-flex flex-column">
      <div className="container-fluid p-3 p-md-5">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <div className="d-flex align-items-center mb-3">
              <div className="col-12">
                <h1 className="text-start" style={{ color: "#aa14f0" }}>
                  HloMail
                </h1>
              </div>
            </div>
          </div>
          <div className="col-auto d-flex align-items-center">
            <button
              className="btn btn-outline-light me-3 mb-2 mb-md-0"
              style={{
                backgroundColor: "#aa14f0",
                border: "1px solid #aa14f0",
              }}
            >
              Back to Home
            </button>
            <button
              className="btn btn-outline-light mb-2 mb-md-0"
              style={{ color: "#aa14f0", border: "1px solid #aa14f0" }}
              onClick={() =>
                (window.location.href = "https://hlomail-frontend.sanjaysagar.com/register")
              }
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <div className="container d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <div className="row justify-content-center w-100">
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div
              className="card mx-auto"
              style={{
                maxWidth: "800px",
                width: "100%",
                height: "auto",
                backgroundColor: "#FFFFFF",
                borderRight: "7px solid #aa14f0",
                borderBottom: "7px solid #aa14f0",
                marginTop: "-150px",
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5
                  className="card-title text-center fs-1 mb-4"
                  style={{ color: "#aa14f0" }}
                >
                  Login
                </h5>
                <h3 className="fs-6 text-black" style={{ color: "#D9D9D9" }}>
                  {" "}
                  Sign in to your Account
                </h3>
                {errorMessage && (
                  <div
                    className="alert pt-2"
                    style={{ backgroundColor: "#aa14f0" }}
                    role="alert"
                  >
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="w-100">
                  <div className="form-group fs-5 p-3">
                    <input
                      type="email"
                      className="form-control fs-6 form-control-lg"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="form-group fs-5 p-3">
                    <input
                      type="password"
                      className="form-control fs-6 form-control-lg"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="d-flex pt-3 d-grid gap-2 col-12 mx-auto justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-lg text-white form-control"
                      style={{ backgroundColor: "#aa14f0" }}
                    >
                      Login
                    </button>
                  </div>
                  <h3
                    className="fs-6 pt-4 d-flex justify-content-center text-black"
                    style={{ color: "#D9D9D9" }}
                  >
                    I forgot my password.
                    <span
                      style={{ color: "#aa14f0", marginLeft: "10px" }}
                      onClick={() =>
                        (window.location.href =
                          "https://hlomail-frontend.sanjaysagar.com/forgotpass")
                      }
                    >
                      {" "}
                      Click here.
                    </span>
                  </h3>
                  <div className="d-grid pt-3 mb-5 gap-2 col-12 mx-auto">
                    <button
                      className="btn btn-outline-light text-black form-control"
                      type="button"
                      style={{ border: "1px solid #aa14f0" }}
                      onClick={() =>
                        (window.location.href =
                          "https://hlomail-frontend.sanjaysagar.com/register")
                      }
                    >
                      Register New Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
