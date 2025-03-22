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
  IonInput,
  IonList,
} from "@ionic/react";
import { addEvent, deleteEvent, fetchEvents } from "../services/EventServices";
import "../pages/MyProfile.css";
import { useLocation } from "react-router-dom";
import { User } from "../Models/User";
import { arrowForward } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { addWishlist } from "../services/WishlistService";

import { Event } from "../Models/Event"; // Adjust the path based on your project structure

import { getUserSummary } from "../services/UserProfile";

import { getWishlistById } from "../services/WishlistService";
const MyProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [date, setDate] = useState<string | undefined>(
    localStorage.getItem("selectedDate") || undefined
  );
  const [selectedEvent, setSelectedEvent] = useState<string | undefined>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | undefined>("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState<any | null>(null);
  const [eventTypes, setEventTypes] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]); // Store events data
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [wishlistName, setWishlistName] = useState("");

  const storedWishlists = JSON.parse(localStorage.getItem("wishlists") || "[]");
  const [wishlists, setWishlists] = useState<Array<any>>(storedWishlists);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState({
    followerCount: 0,
    followeeCount: 0,
    giftGiven: 0,
    giftReceived: 0,
  });

  const location = useLocation();
  const history = useHistory();
  //wishlists

  // Add new wishlist
  const handleAddWishlist = async () => {
    if (!wishlistName.trim()) {
      setError("❌ Wishlist name is required.");
      return;
    }

    try {
      const newWishlist = await addWishlist(wishlistName, userId);
      console.log("API Response:", newWishlist);

      if (!newWishlist || !newWishlist.id) {
        console.error("Error: API returned invalid data", newWishlist);
        setError("❌ Failed to add wishlist. Please try again.");
        return;
      }

      setWishlists((prevWishlists) => {
        console.log("Previous Wishlists:", prevWishlists);

        const updatedWishlists = [...(prevWishlists || []), newWishlist];

        localStorage.setItem("wishlists", JSON.stringify(updatedWishlists));
        return updatedWishlists;
      });

      setWishlistName(""); // ✅ Clear input field
      setShowModal(false);
    } catch (error) {
      console.error("Error adding wishlist:", error);
      setError("❌ Failed to add wishlist. Please check your connection.");
    }
  };

  // Fetch wishlists on mount
  useEffect(() => {
    getWishlistById(userId)
      .then((data) => {
        console.log("✅ Wishlists from API:", data);

        if (Array.isArray(data)) {
          setWishlists((prevWishlists) => {
            const safeWishlists = Array.isArray(prevWishlists)
              ? prevWishlists
              : [];
            const mergedWishlists = [...safeWishlists, ...data].filter(
              (wishlist, index, self) =>
                index === self.findIndex((w) => w.id === wishlist.id)
            );

            localStorage.setItem("wishlists", JSON.stringify(mergedWishlists));
            return mergedWishlists;
          });
        } else {
          console.error("❌ API did not return an array:", data);
        }
      })
      .catch((error) => console.error("❌ Error loading wishlists:", error));
  }, [userId]);

  // ✅ Navigate to Wishlist Details
  const handleNavigate = (id: number, name: string) => {
    history.push(`/wishlist-detail/${id}/${name}`);
  };

  //user local storage
  useEffect(() => {
    const fetchSummary = async () => {
      // const userId = 1; // Replace with actual user ID
      const data = await getUserSummary(userId);
      setSummary(data);
    };
    fetchSummary();
  }, []);
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
    const eventTypes: string[] = [
      "BirthDay",
      "Annivarsary",
      "Valentines day",
      "Marriage Day",
    ]; // Fetch events from the API
    setEventTypes(eventTypes); // Set the fetched events in state
    const getEvents = async () => {
      const eventsData = await fetchEvents(); // Fetch events from the API
      setEvents(eventsData); // Set the fetched events in state
    };

    getEvents();
  }, []);
  const handleDateChange = (e: CustomEvent) => {
    let value = e.detail.value;

    if (Array.isArray(value)) {
      value = value[0]; // Take the first element if it's an array
    }

    if (value) {
      setDate(value);
      localStorage.setItem("selectedDate", value); // Save to local storage
    }
  };
  useEffect(() => {
    const savedDate = localStorage.getItem("selectedDate");
    if (savedDate) {
      setDate(savedDate);
    }
  }, []);
  const handleSaveEvent = async () => {
    if (date && selectedEvent) {
      const eventData: Event = {
        id: 0,
        title: selectedEvent,
        userId: 1, // Replace with the actual user ID
        dateTime: date,
      };

      try {
        await addEvent(eventData);
        setAlertMessage("Event added successfully!");
        setShowAlert(true);
        setIsModalOpen(false);
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
    
    <IonPage  >
      <IonHeader >
        <IonToolbar>
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <IonGrid>
          <IonRow className="ion-align-items-center ion-padding">
            <IonCol size="12" className="ion-text-center">
              {user ? (
                <div>
                  {/* Profile Row */}
                  <IonRow className="ion-align-items-center ion-text-center">
                    <IonCol size="3" sizeMd="4">
                      <IonAvatar className="avathar">
                        <img src={user.profilePicture} alt="Profile" />
                      </IonAvatar>
                    </IonCol>

                    {/* Stats Row 1 */}

                    <IonCol size="4" sizeMd="4">
                      <h4>{summary.followerCount}</h4>
                      <a
                        href="/followers"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Follower
                      </a>
                    </IonCol>
                    <IonCol size="4" sizeMd="4">
                      <h4>{summary.followeeCount}</h4>
                      <a
                        href="/following"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Following
                      </a>
                    </IonCol>
                  </IonRow>

                  {/* Stats Row 2 */}
                  <IonRow className="ion-align-items-center ion-text-center">
                    <IonCol size="3" sizeMd="4" className="margin-left">
                      <p>{user.name}</p>
                      <p>{user.bio}</p>
                    </IonCol>
                    <IonCol size="4" sizeMd="4">
                      <h4>{summary.giftGiven} </h4>
                      <a
                        href="/gifts-given"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Gift given
                      </a>
                    </IonCol>
                    <IonCol size="4" sizeMd="4">
                      <h4>{summary.giftReceived}</h4>
                      <a
                        href="/gifts-taken"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Gift taken
                      </a>
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
          <IonCol size="6">
            <IonButton
              expand="block"
              className="button"
              onClick={() => setIsModalOpen(true)}
            >
              + Event
            </IonButton>
          </IonCol>
          <IonCol size="6">
            <IonButton
              expand="block"
              className="button"
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
          {events.map((event) => (
            <div
              key={event.id}
              style={{ flexShrink: 0, width: "120px", textAlign: "center" }}
              onClick={() => openHighlightModal(event)}
            >
              <IonAvatar className="Avathar">
                <img src={event.image} alt={event.title} />
              </IonAvatar>
              <h5>{event.title}</h5>
            </div>
          ))}
        </div>
        <div>
        <h5 className="title">WISHLIST</h5>
        <IonButton className="addbutton" onClick={() => setShowModal(true)}>
          +
        </IonButton>
        </div>
        <IonList >
          {wishlists.length > 0 ? (
            wishlists.map((wishlist) => (
              <IonItem
                key={wishlist.id}
                button
                onClick={() => handleNavigate(wishlist.id, wishlist.name)}
                className="home-background"
              >
                <IonLabel>{wishlist.name}</IonLabel>
                <IonIcon icon={arrowForward} slot="end" />
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel> No wishlists available </IonLabel>
            </IonItem>
          )}
        </IonList>

        
      </IonContent>

      <IonModal
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        className="custom-modal"
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Wishlist</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow className="ion-align-items-center ion-justify-content-center">
            <IonCol size="12" sizeMd="8">
              <IonItem>
                <IonLabel className="wishlistname" position="floating">
                  {" "}
                  Enter Wishlist Name
                </IonLabel>
                <IonInput
                  className="Input-field"
                  value={wishlistName}
                  onIonChange={(e) => setWishlistName(e.detail.value!)}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
              <IonButton
                className="ion-button"
                expand="block"
                onClick={handleAddWishlist}
              >
                Enter
              </IonButton>
            </IonCol>
            <IonCol size="auto">
              <IonButton
                color="danger"
                expand="block"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </IonButton>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonModal>
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
        onIonChange={handleDateChange}
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
                    {eventTypes.map((event) => (
                      <IonSelectOption key={event} value={event}>
                        {event}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonFooter>
              <IonButton expand="block" onClick={handleSaveEvent}>
                Add Event
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
        Event Date: {date ? new Date(date).toLocaleDateString() : "No date selected"}
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
