import React, { useState, useEffect } from "react";
import "../styles/sidebar.css"; // Ensure you import necessary CSS for styling
import Cookies from "js-cookie";
import mail_logo from "../images/inbox/mail-logo.svg";

interface Message {
  message_id: string;
  title: string;
  readed: boolean;
}

interface FullMessage {
  _id: string;
  title: string;
  message: string;
  readed: boolean;
}

const Inbox: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<FullMessage | null>(
    null
  );
  const [isMessageView, setIsMessageView] = useState(false); // State to manage view mode
  const [forceUpdate, setForceUpdate] = useState(false); // State for forcing component rerender
  const [profileImage, setProfileImage] = useState<string>(""); // State to store profile image URL

  const token = Cookies.get("token");

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleResize = () => {
    if (window.innerWidth >= 992) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const fetchProfileImage = async () => {
    try {
      const response = await fetch("https://hlomail.sanjaysagar.com/logo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const imageData = await response.blob();
      const imageUrl = URL.createObjectURL(imageData);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch("https://hlomail.sanjaysagar.com/inbox", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.valid) {
        // Modify titles to add dot if readed is false
        const modifiedMessages = data.inbox.map((msg: Message) => ({
          ...msg,
          title: msg.readed ? msg.title : `* ${msg.title} `,
        }));
        setMessages(modifiedMessages);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchMessageById = async (message_id: string) => {
    try {
      const response = await fetch(
        `https://hlomail.sanjaysagar.com/inbox-message/${message_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.valid) {
        setSelectedMessage(data.inbox);
        setIsMessageView(true); // Switch to message view
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  };

  const handleBackButtonClick = () => {
    setIsMessageView(false);
    setSelectedMessage(null);
    setForceUpdate((prev) => !prev); // Toggle forceUpdate to trigger rerender
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    fetchMessages(); // Fetch messages on mount
    fetchProfileImage(); // Fetch profile image on mount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [forceUpdate]); // Include forceUpdate in dependencies to rerender on state change

  return (
    <>
      <span className="toggle-btn toggle-right">
        {profileImage && (
          <img
            width="26"
            height="26"
            style={{ zIndex: 12, right: 60 }}
            className="position-fixed"
            src={profileImage}
            alt="toggle"
          />
        )}
      </span>
      <span
        className="toggle-btn toggle-right"
        onClick={handleToggleVisibility}
      >
        <img
          width="26"
          height="26"
          style={{ zIndex: 12, right: 10 }}
          className="position-fixed"
          src={mail_logo}
          alt="toggle"
        />
      </span>
      <div
        className={`sidebar right-sidebar ${isVisible ? "show" : ""}`}
        style={{ top: "10px" }}
      >
        <div className="container">
          <div className="card shadow bg-white rounded-lg">
            <div
              className="d-flex flex-column ps-3 mt-3"
              style={{
                maxHeight: "65vh",
                minHeight: "65vh",
                overflowY: "auto",
              }} // Adjusted styles for message container
            >
              <span>
                <div className="row">
                  <div className="col-2">
                    <img src={mail_logo} height={30} width={30} alt="logo" />
                  </div>
                  <div className="col">
                    <h2>Inbox</h2>
                  </div>
                </div>
              </span>

              {!isMessageView ? (
                <ul className="nav flex-column message-list">
                  {messages.map((msg) => (
                    <li className="nav-item mt-3" key={msg.message_id}>
                      <a
                        className="nav-link"
                        href="#"
                        onClick={() => fetchMessageById(msg.message_id)}
                      >
                        {msg.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="message-details mt-3">
                  <img
                    className="btn p-0"
                    onClick={handleBackButtonClick}
                    src="https://img.icons8.com/metro/26/back.png"
                    alt="back"
                  />
                  {selectedMessage && (
                    <>
                      <h5 className="pt-3">{selectedMessage.title}</h5>
                      <p>{selectedMessage.message}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
