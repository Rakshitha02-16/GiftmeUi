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
import { User } from "../interfaces/Models";
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
            <IonAvatar onClick={() => setShowActionSheet(true)}>
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
                  text: "Take Photo",
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
            <IonItem className="form-item">
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput
                value={userData.name}
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
              />
            </IonItem>

            <IonButton type="submit" color="secondary">
              Save
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
