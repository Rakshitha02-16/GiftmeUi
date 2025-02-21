import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonTextarea,
  IonButton,
  IonImg,
  IonAvatar,
  IonItem,
  IonLabel,
  IonActionSheet,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { createUser, updateUser, deleteProfilePic, fetchUser } from "../services/ProfileService";
import { User } from "../Models/User";
import "../pages/PersonalDetails.css";

const EditProfile: React.FC = () => {
  const history = useHistory();

  const [userData, setUserData] = useState<User>({
    id: 0,
    name: "",
    email: "",
    bio: "",
    phone: 0,
    address: [],
    profilePicture: "https://via.placeholder.com/150",
  });

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user data from the backend on component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUser = await fetchUser(); // Fetch user data from API
        setUserData(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle profile picture deletion
  const handleProfilePicDelete = async () => {
    try {
      await deleteProfilePic();
      setUserData((prev) => ({ ...prev, profilePicture: "" }));
      setShowActionSheet(false);
    } catch (error) {
      console.error("Failed to delete profile picture:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      let updatedUser;
      if (userData.id === 0) {
        updatedUser = await createUser(userData); // Create new user
      } else {
        updatedUser = await updateUser(userData); // Update existing user
      }

      // Save updated user data to localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Navigate to Tab3
      history.push("/tab3");
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  // Handle profile picture change
  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <IonContent>Loading...</IonContent>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <div>
            <IonAvatar onClick={() => setShowActionSheet(true)} className="Avatar">
              <IonImg
                src={userData.profilePicture || "https://via.placeholder.com/150"}
                alt="Profile Picture"
              />
            </IonAvatar>

            <IonActionSheet
              isOpen={showActionSheet}
              buttons={[
                {
                  text: "Choose from Library",
                  handler: () => document.getElementById("profile-pic-input")?.click(),
                },
                
                {
                  text: "Delete Current Picture",
                  role: "destructive",
                  handler: handleProfilePicDelete,
                },
                {
                  text: "Cancel",
                  role: "cancel",
                  handler: () => setShowActionSheet(false),
                },
              ]}
              onDidDismiss={() => setShowActionSheet(false)}
            />

            <input
              type="file"
              id="profile-pic-input"
              style={{ display: "none" }}
              onChange={handleProfilePicChange}
              accept="image/*"
            />
          </div>

          <div>
            <IonItem >
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput
                value={userData.name}
                className="input-box"
                onIonChange={(e) => setUserData({ ...userData, name: e.detail.value! })}
                placeholder="Name"
                required
              />
            </IonItem>

            <IonItem className="form-item">
              <IonLabel position="stacked">Bio</IonLabel>
              <IonTextarea
                value={userData.bio}
                onIonChange={(e) => setUserData({ ...userData, bio: e.detail.value! })}
                placeholder="Bio"
                className="input-box"
              />
            </IonItem>

            <IonButton className="button" type="submit" expand="full" >
              Save
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
// import React, { useState, useEffect } from "react";
// import {
//   IonButton,
//   IonModal,
//   IonContent,
//   IonGrid,
//   IonRow,
//   IonCol,
//   IonItem,
//   IonLabel,
//   IonDatetime,
//   IonSelect,
//   IonSelectOption,
//   IonFooter,
//   IonAvatar,
//   IonCardTitle,
//   IonAlert,
//   IonHeader,
//   IonIcon,
//   IonToolbar,
//   IonTitle,
//   IonPage,
//   IonInput,
//   IonList,
// } from "@ionic/react";
// import { addEvent, deleteEvent, fetchEvents } from "../services/EventServices";
// import { settingsOutline } from "ionicons/icons";
// import "../pages/MyProfile.css";
// import { useLocation } from "react-router-dom";
// import { User } from "../interfaces/Models"; // Adjust the path as needed
// import { arrowForward } from "ionicons/icons"; // Import the arrow icon
// import { useHistory } from "react-router-dom";
// import { addWishlist } from "../services/WishlistService";
// import { Wishlist as WishlistInterface } from "../interfaces/Models";
// import { Event } from "../interfaces/Models"; // Adjust the path based on your project structure

// import "../pages/wishlist.css";
// const MyProfile = () => {
//   const [date, setDate] = useState<string | undefined>("");
//   const [selectedEvent, setSelectedEvent] = useState<string | undefined>("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [alertMessage, setAlertMessage] = useState<string | undefined>("");
//   const [showAlert, setShowAlert] = useState(false);
//   const [selectedHighlight, setSelectedHighlight] = useState<any | null>(null);
//   const [eventTypes, setEventTypes] = useState<any[]>([]);
//   const [events, setEvents] = useState<any[]>([]); // Store events data
//   const [user, setUser] = useState<User | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [wishlistName, setWishlistName] = useState("");
//   const [wishlists, setWishlists] = useState<WishlistInterface[]>([]);
//   const location = useLocation();
//   const history = useHistory();
//   //wishlists
//   const handleNavigate = (wishlistId: number) => {
//     history.push(`/wishlist-detail/${wishlistId}`);
//   };

//   const handleAddWishlist = async () => {
//     try {
//       const newWishlist = await addWishlist(wishlistName);

//       // Log the newly added wishlist to check its content
//       console.log("New Wishlist added:", newWishlist);

//       if (newWishlist && newWishlist.name) {
//         // Add the new wishlist to the state
//         setWishlists((prevWishlists) => [...prevWishlists, newWishlist]);
//         setWishlistName("");
//         setShowModal(false);
//       } else {
//         console.error("Error: New wishlist does not contain a valid name");
//       }
//     } catch (error) {
//       console.error("Error adding wishlist:", error);
//     }
//   };
//   //user local storage
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const handleEditClick = () => {
//     history.push("/edit-profile"); // Navigate using push
//   };
//   useEffect(() => {
//       const eventTypes:string[] =["BirthDay","Annivarsary","Valentines day","Marriage Day"]  // Fetch events from the API
//       setEventTypes(eventTypes); // Set the fetched events in state
//       const getEvents = async () => {
//         const eventsData = await fetchEvents(); // Fetch events from the API
//         setEvents(eventsData); // Set the fetched events in state
//       };
  
//       getEvents();
//   }, []);

//   const handleSaveEvent = async () => {
//     if (date && selectedEvent) {
//       const eventData: Event = {
//         id:0,
//         title: selectedEvent,
//         userId: 1, // Replace with the actual user ID
//         dateTime: date,
//       };

//       try {
//         // Call the addEvent function and pass the correct event data type
//         await addEvent(eventData);
//         setAlertMessage("Event added successfully!");
//         setShowAlert(true);
//         setIsModalOpen(false);
//       } catch (error) {
//         setAlertMessage("Failed to add event. Please try again.");
//         setShowAlert(true);
//       }
//     } else {
//       setAlertMessage("Please select an event and date.");
//       setShowAlert(true);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedEvent(undefined);
//     setDate(undefined);
//   };

//   const openHighlightModal = (highlight: any) => {
//     setSelectedHighlight(highlight);
//   };

//   const closeHighlightModal = () => {
//     setSelectedHighlight(null);
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const response = await deleteEvent(id.toString()); // Call deleteEvent from service.js
//       if (response === "Successfully Deleted") {
//         setSelectedHighlight(null); // Clear selected highlight
//         setAlertMessage("Event deleted successfully!"); // Success message
//         setShowAlert(true);
//       }
//     } catch (error) {
//       setAlertMessage("Failed to delete item. Please try again."); // Error message
//       setShowAlert(true);
//     }
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>My Profile</IonTitle>
//           <IonButton fill="clear" slot="end">
//             <IonIcon icon={settingsOutline} />
//           </IonButton>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
//         <IonGrid>
//           <IonRow className="ion-align-items-center ion-padding">
//             <IonCol size="12" className="ion-text-center">
//               {user ? (
//                 <div>
//                   {/* Profile Row */}
//                   <IonRow className="ion-align-items-center ion-text-center">
//                     <IonCol size="3" sizeMd="4">
//                       <IonAvatar className="avathar">
//                         <img src={user.profilePicture} alt="Profile" />
//                       </IonAvatar>
//                     </IonCol>

//                     {/* Stats Row 1 */}

//                     <IonCol size="4" sizeMd="4">
//                       <h4>340</h4>
//                       <p>Followers</p>
//                     </IonCol>
//                     <IonCol size="4" sizeMd="4">
//                       <h4>250</h4>
//                       <p>Following</p>
//                     </IonCol>
//                   </IonRow>

//                   {/* Stats Row 2 */}
//                   <IonRow className="ion-align-items-center ion-text-center">
//                     <IonCol size="3" sizeMd="4" className="margin-left">
//                       <p>{user.name}</p>
//                       <p>{user.bio}</p>
//                     </IonCol>
//                     <IonCol size="4" sizeMd="4">
//                       <h4>250</h4>
//                       <p>Gift Given</p>
//                     </IonCol>
//                     <IonCol size="4" sizeMd="4">
//                       <h4>250</h4>
//                       <p>Gift Taken</p>
//                     </IonCol>
//                   </IonRow>
//                 </div>
//               ) : (
//                 <p>Loading...</p>
//               )}
//             </IonCol>
//           </IonRow>
//         </IonGrid>

//         <IonRow>
//           <IonCol size="6">
//             <IonButton
//               expand="block"
//              className="button"
//               onClick={() => setIsModalOpen(true)}
//             >
//               + Event
//             </IonButton>
//           </IonCol>
//           <IonCol size="6">
//             <IonButton
//               expand="block"
//               className="button"
//               onClick={handleEditClick}
//             >
//               Edit profile
//             </IonButton>
//           </IonCol>
//         </IonRow>

//         <div
//           className="horizontal-scroll-container"
//           style={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap" }}
//         >
//           {events.map((event) => (
//             <div
//               key={event.id}
//               style={{ flexShrink: 0, width: "120px", textAlign: "center" }}
//               onClick={() => openHighlightModal(event)}
//             >
//               <IonAvatar className="Avathar">
//                 <img src={event.image} alt={event.title} />
//               </IonAvatar>
//               <IonCardTitle>{event.title}</IonCardTitle>
//             </div>
//           ))}
//         </div>
//         <h4>Wishlists</h4>
//         <IonList>
//           {wishlists.map((wishlist) => (
//             <IonItem
//               key={wishlist.id}
//               button
//               onClick={() => handleNavigate(wishlist.id)}
//             >
//               <IonLabel>{wishlist.name || "Unnamed Wishlist"}</IonLabel>
//               <IonIcon icon={arrowForward} slot="end" />
//             </IonItem>
//           ))}
//         </IonList>
//         <IonButton className="button" onClick={() => setShowModal(true)}>Add</IonButton>
//       </IonContent>

//       <IonModal
//         isOpen={showModal}
//         onDidDismiss={() => setShowModal(false)}
//         className="custom-modal"
//       >
//         <IonHeader>
//           <IonToolbar>
//             <IonTitle>Add Wishlist</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <IonContent className="ion-padding">
//           <IonRow className="ion-align-items-center ion-justify-content-center">
//             <IonCol size="12" sizeMd="8">
//               <IonItem>
//                 <IonLabel position="floating"> Enter Wishlist Name</IonLabel>
//                 <IonItem className="input-box">
  
//   <IonInput 
//     className="input-box"
//     value={wishlistName}
//     onIonChange={(e) => setWishlistName(e.detail.value!)}
//     placeholder="Enter wishlist name"
//   />
// </IonItem>

//               </IonItem>
//             </IonCol>
//           </IonRow>
//           <IonRow className="ion-justify-content-center">
//             <IonCol size="auto">
//               <IonButton
//                 className="ion-button"
//                 expand="block"
//                 onClick={handleAddWishlist}
//               >
//                 Enter
//               </IonButton>
//             </IonCol>
//             <IonCol size="auto">
//               <IonButton
//                 color="danger"
//                 expand="block"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </IonButton>
//             </IonCol>
//           </IonRow>
//         </IonContent>
//       </IonModal>
//       <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
//         <IonContent>
//           <IonGrid>
//             <IonRow>
//               <IonCol>
//                 <h2>Add Event</h2>
//               </IonCol>
//             </IonRow>
//             <IonRow>
//               <IonCol>
//                 <IonItem>
//                   <IonLabel>Date</IonLabel>
//                   <IonDatetime
//                     presentation="date"
//                     onIonChange={(e) => {
//                       const value = Array.isArray(e.detail.value)
//                         ? e.detail.value[0]
//                         : e.detail.value;
//                       setDate(value as string | undefined);
//                     }}
//                   />
//                 </IonItem>
//               </IonCol>
//             </IonRow>

//             <IonRow>
//               <IonCol>
//                 <IonItem>
//                   <IonLabel>Event</IonLabel>
//                   <IonSelect
//                     placeholder="Select an event"
//                     value={selectedEvent}
//                     onIonChange={(e) => {
//                       const eventValue = e.detail.value;
//                       setSelectedEvent(eventValue);

//                       // Do not trigger any backend call here.
//                       // Simply update the local state without sending data to the backend.
//                       // You can prevent triggering a backend API call here if needed.
//                     }}
//                   >
//                     {eventTypes.map((event) => (
//                       <IonSelectOption key={event} value={event}>
//                         {event}
//                       </IonSelectOption>
//                     ))}
//                   </IonSelect>
//                 </IonItem>
//               </IonCol>
//             </IonRow>
//             <IonFooter>
//               <IonButton
//                 expand="block"
//                 color="primary"
//                 onClick={handleSaveEvent}
//               >
//                 Add Event
//               </IonButton>
//               <IonButton expand="block" color="medium" onClick={closeModal}>
//                 Cancel
//               </IonButton>
//             </IonFooter>
//           </IonGrid>
//         </IonContent>
//       </IonModal>

//       {/* Highlight Display */}

//       {/* Selected Highlight Modal */}
//       {selectedHighlight && (
//         <IonModal 
//           isOpen={!!selectedHighlight}
//           onDidDismiss={closeHighlightModal}
//         >
//           <IonContent>
//             <IonGrid>
//               <IonRow>
//                 <IonCol>
//                   <div
//                     style={{
//                       backgroundImage: `url(${selectedHighlight.image})`,
//                       backgroundSize: "cover",
//                       backgroundPosition: "center",
//                       height: "65vh",
//                       position: "relative",
//                     }}
//                   >
//                     <div
//                       style={{
//                         position: "absolute",
//                         bottom: "10px",
//                         left: "10px",
//                         backgroundColor: "rgba(255, 255, 255, 0.8)",
//                         padding: "5px 10px",
//                         borderRadius: "5px",
//                       }}
//                     >
//                       <span style={{ fontSize: "16px", color: "black" }}>
//                         Event Date: {selectedHighlight.description}
//                       </span>
//                     </div>
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: "10px",
//                         right: "10px",
//                       }}
//                     >
//                       <IonButton
//                         onClick={() => handleDelete(selectedHighlight?.id)}
//                       >
//                         Delete
//                       </IonButton>
//                     </div>
//                   </div>
//                 </IonCol>
//               </IonRow>
//             </IonGrid>
//           </IonContent>
//         </IonModal>
//       )}

//       {/* Alert */}
//       {showAlert && (
//         <IonAlert
//           isOpen={showAlert}
//           onDidDismiss={() => setShowAlert(false)}
//           message={alertMessage}
//           buttons={["OK"]}
//         />
//       )}
//     </IonPage>
//   );
// };

// export default MyProfile;
