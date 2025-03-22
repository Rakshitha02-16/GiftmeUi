import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonModal,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonFooter,
  IonAvatar,
  IonCardTitle,
  IonAlert,
  IonHeader,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonPage,
} from "@ionic/react";
import { addEvent, deleteEvent, fetchEvents } from "../services/ProfileService";
import { useHistory } from "react-router-dom";
import { settingsOutline } from "ionicons/icons";
import "../pages/MyProfile.css";
import { useLocation } from "react-router-dom";
import { User } from "../interfaces/Models"; // Adjust the path as needed

const MyProfile = () => {
  const [date, setDate] = useState<string | undefined>("");
  const [selectedEvent, setSelectedEvent] = useState<string | undefined>("");
  const [highlights, setHighlights] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | undefined>("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState<any | null>(null);
  const [events, setEvents] = useState<any[]>([]); // Store events data
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleEditClick = () => {
    history.push("/edit-profile"); // Navigate using push
  };
  useEffect(() => {
    const getEvents = async () => {
      const eventsData = await fetchEvents(); // Fetch events from the API
      setEvents(eventsData); // Set the fetched events in state
    };

    getEvents(); // Call the function to fetch events
  }, []);

  const handleSaveEvent = async () => {
    if (date && selectedEvent) {
      const eventData: EventData = {
        title: selectedEvent,
        userId: 1, // Replace with the actual user ID
        dateTime: date,
      };

      try {
        // Call the addEvent function and pass the correct event data type
        await addEvent(eventData);
        setAlertMessage("Event added successfully!");
        setShowAlert(true);
        setIsModalOpen(false);
        setHighlights((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            image:
              selectedEvent === "Birthday"
                ? "https://media.istockphoto.com/id/1154066614/photo/happy-birthday-to-you-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=T6bCvP_eJaySZul0pNvQrsC1_fZQBABqPH6CucZXuV0="
                : selectedEvent === "Anniversary"
                ? "https://omghitched.com/wp-content/uploads/2024/06/image-98.jpeg"
                : selectedEvent === "Functions"
                ? "https://www.arin.net/participate/meetings/meetings.jpg"
                : "https://via.placeholder.com/150",
            name: selectedEvent,
            description: `Event on ${new Date(date).toLocaleDateString()}`,
          },
        ]);
      } catch (error) {
        setAlertMessage("Failed to add event. Please try again.");
        setShowAlert(true);
      }
    } else {
      setAlertMessage("Please select an event and date.");
      setShowAlert(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(undefined);
    setDate(undefined);
  };

  const openHighlightModal = (highlight: any) => {
    setSelectedHighlight(highlight);
  };

  const closeHighlightModal = () => {
    setSelectedHighlight(null);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteEvent(id.toString()); // Call deleteEvent from service.js
      if (response === "Successfully Deleted") {
        setHighlights((prev) => prev.filter((item) => item.id !== id)); // Remove deleted item from highlights
        setSelectedHighlight(null); // Clear selected highlight
        setAlertMessage("Event deleted successfully!"); // Success message
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Failed to delete item. Please try again."); // Error message
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Profile</IonTitle>
          <IonButton fill="clear" slot="end">
            <IonIcon icon={settingsOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonGrid>
  <IonRow className="ion-align-items-center ion-padding">
    <IonCol size="12" className="ion-text-center">
      {user ? (
        <div>
          {/* Profile Row */}
          <IonRow className="ion-align-items-center ion-text-center">
            <IonCol size="3" sizeMd="4">
              <IonAvatar className="avathar" >
                <img src={user.profilePicture} alt="Profile" />
              </IonAvatar>
            </IonCol>
           

          {/* Stats Row 1 */}
         
            <IonCol size="4" sizeMd="4">
              <h4>340</h4>
              <p>Followers</p>
            </IonCol>
            <IonCol size="4" sizeMd="4">
              <h4>250</h4>
              <p>Following</p>
            </IonCol>
          </IonRow>
        
         
          {/* Stats Row 2 */}
          <IonRow className="ion-align-items-center ion-text-center">
          <IonCol size="3" sizeMd="4" className="margin-left">
              <p>{user.name}</p>
              <p>{user.bio}</p>
            </IonCol>
            <IonCol size="4" sizeMd="4">
              <h4>250</h4>
              <p>Gift Given</p>
            </IonCol>
            <IonCol size="4" sizeMd="4">
              <h4>250</h4>
              <p>Gift Taken</p>
            </IonCol>
           
          </IonRow>
         
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </IonCol>
  </IonRow>
</IonGrid>


        <IonRow>
          <IonCol size="6" >
            <IonButton
              expand="block"
              color="secondary"
              onClick={() => setIsModalOpen(true)}
            >
              + Event
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton
              expand="block"
              color="secondary"
              onClick={handleEditClick}
            >
              Edit profile
            </IonButton>
          </IonCol>
        </IonRow>

        <div
          className="horizontal-scroll-container"
          style={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap" }}
        >
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              style={{ flexShrink: 0, width: "120px", textAlign: "center" }}
              onClick={() => openHighlightModal(highlight)}
            >
              <IonAvatar className="Avathar">
                <img src={highlight.image} alt={highlight.name} />
              </IonAvatar>
              <IonCardTitle>{highlight.name}</IonCardTitle>
            </div>
          ))}
        </div>
      </IonContent>
      <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <h2>Add Event</h2>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Date</IonLabel>
                  <IonDatetime
                    presentation="date"
                    onIonChange={(e) => {
                      const value = Array.isArray(e.detail.value)
                        ? e.detail.value[0]
                        : e.detail.value;
                      setDate(value as string | undefined);
                    }}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
              <IonItem>
  <IonLabel>Event</IonLabel>
  <IonSelect
    placeholder="Select an event"
    value={selectedEvent}
    onIonChange={(e) => {
      const eventValue = e.detail.value;
      setSelectedEvent(eventValue);

      // Do not trigger any backend call here.
      // Simply update the local state without sending data to the backend.
      // You can prevent triggering a backend API call here if needed.
    }}
  >
    {events.map((event) => (
      <IonSelectOption key={event.id} value={event.title}>
        {event.title}
      </IonSelectOption>
    ))}
  </IonSelect>
</IonItem>

              </IonCol>
            </IonRow>
            <IonFooter>
              <IonButton
                expand="block"
                color="primary"
                onClick={handleSaveEvent}
              >
                Add Highlight
              </IonButton>
              <IonButton expand="block" color="medium" onClick={closeModal}>
                Cancel
              </IonButton>
            </IonFooter>
          </IonGrid>
        </IonContent>
      </IonModal>

      {/* Highlight Display */}

      {/* Selected Highlight Modal */}
      {selectedHighlight && (
        <IonModal
          isOpen={!!selectedHighlight}
          onDidDismiss={closeHighlightModal}
        >
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <div
                    style={{
                      backgroundImage: `url(${selectedHighlight.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "65vh",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "10px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        padding: "5px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      <span style={{ fontSize: "16px", color: "black" }}>
                        Event Date: {selectedHighlight.description}
                      </span>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      <IonButton
                        onClick={() => handleDelete(selectedHighlight?.id)}
                      >
                        Delete
                      </IonButton>
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      )}

      {/* Alert */}
      {showAlert && (
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={alertMessage}
          buttons={["OK"]}
        />
      )}
    </IonPage>
  );
};

export default MyProfile;
