import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonModal,
  IonCardTitle,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonFooter,
  IonItem,
  IonLabel,
  IonAlert,
  IonSpinner,
} from "@ionic/react";
import { settingsOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name] = useState("Nithya");
  const [highlights, setHighlights] = useState<any[]>([]);
  const [date, setDate] = useState<string | undefined>(undefined); // Date of state
  const [selectedEvent, setSelectedEvent] = useState<string | undefined>();
  const [selectedHighlight, setSelectedHighlight] = useState<any>(null); // Selected highlight for popup
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  const [events, setEvents] = useState<any[]>([]); // Events state
  const [loading, setLoading] = useState(false); // Loading state for fetching events
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [anniversaryItems, setAnniversaryItems] = useState([
    { id: 1, imgSrc: "https://via.placeholder.com/150" },
    { id: 2, imgSrc: "https://via.placeholder.com/150" },
  ]);
  const [birthdayItems, setBirthdayItems] = useState([
    { id: 3, imgSrc: "https://via.placeholder.com/150" },
    { id: 4, imgSrc: "https://via.placeholder.com/150" },
  ]);
  const [showToast, setShowToast] = useState(false);

  const history = useHistory();

  const navigateToWishList = () => {
    history.push('/wishList');
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
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

  const handleDelete = async (id: string) => {
    const apiUrl = `https://localhost:7241/api/Event?Id=${id}`;
    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        setHighlights((prev) => prev.filter((item) => item.id !== id));
        setSelectedHighlight(null);
      } else {
        const errorData = await response.json();
        setAlertMessage(`Failed to delete item: ${errorData.message || "Unknown error"}`);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error during delete operation:", error);
      setAlertMessage("An error occurred while deleting the item.");
      setShowAlert(true);
    }
  };

  const handleSaveEvent = () => {
    // Save event logic
    console.log("Event saved");
  };

  const handleAdd = () => {
    // Add event logic
    console.log("Event added");
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
            <IonCol size="2" className="ion-text-center">
              <IonAvatar>
                <img
                  src="https://randomuser.me/api/portraits/women/45.jpg"
                  alt="Lady Avatar"
                />
              </IonAvatar>
            </IonCol>
            <IonCol size="4" className="ion-text-center">
              <h3>12</h3>
              <p>Wishlist</p>
            </IonCol>
            <IonCol size="3" className="ion-text-center">
              <h3>340</h3>
              <p>Followers</p>
            </IonCol>
            <IonCol size="3" className="ion-text-center">
              <h3>250</h3>
              <p>Following</p>
            </IonCol>
          </IonRow>

          <h2>{name}</h2>

          <IonRow>
            <p className="ion-padding-start">
              If you can imagine it, you can achieve it! If you can dream it,
              you can become it.
            </p>
          </IonRow>

          <IonRow>
            <IonCol size="6">
              <IonButton expand="block" color="dark">
                Edit Profile
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton
                expand="block"
                color="dark"
                onClick={handleOpenModal}
              >
                + Events
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonModal isOpen={isModalOpen} onDidDismiss={handleCloseModal}>
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
                      onIonChange={(e) => setDate(e.detail.value!)}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel>Event</IonLabel>
                    {loading ? (
                      <IonSpinner />
                    ) : (
                      <IonSelect
                        placeholder="Select an event"
                        value={selectedEvent}
                        onIonChange={(e) => setSelectedEvent(e.detail.value)}
                      >
                        {events.length === 0 ? (
                          <IonSelectOption disabled>
                            No events available
                          </IonSelectOption>
                        ) : (
                          events
                            .filter((event) => event.title !== selectedEvent)
                            .map((event) => (
                              <IonSelectOption key={event.id} value={event.title}>
                                {event.title}
                              </IonSelectOption>
                            ))
                        )}
                      </IonSelect>
                    )}
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonFooter>
                <IonButton
                  expand="block"
                  color="primary"
                  onClick={() => {
                    handleSaveEvent();
                    handleAdd();
                  }}
                >
                  Add
                </IonButton>
                <IonButton expand="block" color="medium" onClick={handleCloseModal}>
                  Cancel
                </IonButton>
              </IonFooter>
            </IonGrid>
          </IonContent>
        </IonModal>

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

        {selectedHighlight && (
          <IonModal
            isOpen={!!selectedHighlight}
            onDidDismiss={closeHighlightModal}
          >
            <IonContent>
              <IonGrid>
                <IonRow>
                  <IonCol className="popup-container">
                    <div
                      className="popup-background"
                      style={{
                        backgroundImage: `url(${selectedHighlight.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "60vh", // Default height for the image
                        width: "100%", // Full width of the container
                        position: "relative",
                        marginTop: "57px",
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
                        {selectedDate ? (
                          <span style={{ fontSize: "16px", color: "black" }}>
                            Selected Date:{" "}
                            {new Date(selectedDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span style={{ fontSize: "16px", color: "gray" }}>
                            No date selected
                          </span>
                        )}
                      </div>
                      {/* Three dots menu */}
                      <div
                        style={{
                          position: "absolute",
                          color: "black",
                          right: "10px",
                          marginTop: "-60px",
                        }}
                      >
                        <IonButton
                          onClick={() => handleDelete(selectedHighlight.id)}
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

        <IonAlert
          isOpen={!!alertMessage}
          onDidDismiss={() => setAlertMessage(undefined)}
          header="Notification"
          message={alertMessage || ""}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
