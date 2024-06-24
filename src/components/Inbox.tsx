import React, { useState, useEffect } from "react";
import "../styles/sidebar.css"; // Ensure you import necessary CSS for styling
import Cookies from "js-cookie";
import mail_logo from "../images/inbox/mail-logo.svg";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../styles/inbox.css"
import {
  Container,
  Card,
  Col,
  Row,
  ListGroup,
  Image,
  Button,
} from "react-bootstrap"; // Import Bootstrap components

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
      const response = await fetch("https://api.hlomail.in/logo", {
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
      const response = await fetch("https://api.hlomail.in/inbox", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.valid) {
        // Modify titles to add asterisk (*) for unread messages and truncate if longer than 10 characters
        const modifiedMessages = data.inbox.map((msg: Message) => {
          let modifiedTitle =
            msg.title.length > 18
              ? msg.title.substring(0, 18) + "..."
              : msg.title;
          if (!msg.readed) {
            modifiedTitle = `${modifiedTitle}`;
          }
          return {
            ...msg,
            title: modifiedTitle,
          };
        });
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
        `https://api.hlomail.in/inbox-message/${message_id}`,
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
      <span className="toggle-btn ">
        {profileImage && (
          <Image
            width={35}
            height={35}
            
            style={{ zIndex: 12, right: 20, top:"2%",border: '1px solid black'}}
            className="position-fixed"
            src={profileImage}
            alt="Profile"
            roundedCircle
          />
        )}
      </span>
      <span
        className="toggle-btn toggle-right"
        onClick={handleToggleVisibility}
      >
        <Image
          width={30}
          height={30}
          style={{ zIndex: 12, right: 70,top:"2%" }}
          className="position-fixed"
          src={mail_logo}
          alt="Mail Logo"
          
        />
      </span>
      <div
        className={`sidebar right-sidebar ${isVisible ? "show" : ""}`}
        style={{ top: "10px" }}
      >
        <Container>
          <Card className="shadow bg-white " style={{borderRadius:"25px"}}>
            <Card.Body
              className="ps-3 mt-3"
              style={{
                minHeight: "65vh",
                maxHeight: "65vh",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <Row >
                <Col xs={2}>
                  <Image
                    src={mail_logo}
                    height={30}
                    width={30}
                    alt="logo"
                    
                  />
                </Col>
                <Col>
                  <h2>Inbox</h2>
                </Col>
              </Row>

              {!isMessageView ? (
                <ListGroup className="flex-column message-list">
                  {messages.map((msg) => (
                    <ListGroup.Item
                      key={msg.message_id}
                      action
                      onClick={() => fetchMessageById(msg.message_id)}
                      className={`d-flex justify-content-between align-items-center mt-3 ${
                        !msg.readed ? "font-weight-bold" : "font-weight-light"
                      }`}
                    >
                      {msg.title}
                      {!msg.readed && (
                        <span className="badge bg-primary rounded-pill">1</span>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="message-details mt-3">
                  <Button
                    variant="link"
                    onClick={handleBackButtonClick}
                    className="btn p-0"
                  >
                    <Image
                      src="https://img.icons8.com/metro/26/back.png"
                      alt="Back"
                    />
                  </Button>
                  {selectedMessage && (
                    <>
                      <h5 className="pt-3">{selectedMessage.title}</h5>
                      <p>{selectedMessage.message}</p>
                    </>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Inbox;
