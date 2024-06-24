import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!token) {
      setMessage("Invalid or missing token.");
      return;
    }
    try {
      const response = await fetch(
        `https://api.hlomail.in/reset-password?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ new_password: newPassword }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMessage("Password reset successfully!");
      } else {
        const errorData = await response.json();
        setMessage(
          errorData.message || "Something went wrong, please try again."
        );
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <main
        className="vh-100 d-flex flex-column"
        style={{ backgroundColor: "#FFFFFF" }}
      >
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
                  height: "400px",
                  backgroundColor: "#FFFFFF",
                  borderRight: "7px solid #aa14f0",
                  borderBottom: "7px solid #aa14f0",
                  marginTop: "-150px",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5
                    className="card-title text-center fs-1 mb-1"
                    style={{ color: "#aa14f0" }}
                  >
                    Reset Password
                  </h5>
                  {message && (
                    <div
                      className="alert pt-2"
                      style={{ backgroundColor: "#aa14f0" }}
                      role="alert"
                    >
                      {message}
                    </div>
                  )}
                  <h3
                    className="fs-6 text-dark mb-4"
                    style={{ color: "#D9D9D9" }}
                  >
                    Enter your new password
                  </h3>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Your New Password"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="d-flex pt-3 d-grid gap-2 col-12 mx-auto justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-lg text-white form-control"
                        style={{ backgroundColor: "#aa14f0" }}
                        onClick={() => {
                          setMessage("processing");
                        }}
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPass;
