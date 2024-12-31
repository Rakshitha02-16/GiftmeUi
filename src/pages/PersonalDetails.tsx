import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonInput,
  IonTextarea,
  IonImg,
  IonAvatar,
} from "@ionic/react";
import React, { useState } from "react";
import "./PersonalDetails.css"; // Ensure this file exists in the same folder as PersonalDetails.tsx

const PersonalDetails: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  // Handle file selection
  const handlePersonal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted with details:");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Bio:", bio);
    console.log("Profile Image:", profileImage);
    // Add your form submission logic here
  };

  return (
    <IonPage >
      <IonHeader >
        <IonTitle>Edit Personal Details</IonTitle>
      </IonHeader>
      <IonContent>
      <IonItem>
            <IonLabel position="stacked">Profile Photo</IonLabel>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handlePersonal}
              style={{ display: "none" }}
            />
          </IonItem>
          

          {/* Display the selected profile image as a round photo */}
          {profileImage && (
            <IonAvatar className="profile-photo-container">
              <IonImg src={profileImage} alt="Profile" className="profile-photo" onClick={() => document.getElementById("file-input")?.click()} />
            </IonAvatar>
          )}
          <IonButton
            fill="clear"
            color="dark"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            Edit Picture
          </IonButton>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">First Name</IonLabel>
            <IonInput
              value={firstName}
              placeholder="Enter your first name"
              onIonChange={(e) => setFirstName(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Last Name</IonLabel>
            <IonInput
              value={lastName}
              placeholder="Enter your last name"
              onIonChange={(e) => setLastName(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Bio</IonLabel>
            <IonTextarea
              value={bio}
              placeholder="Write a short bio about yourself or the company"
              onIonChange={(e) => setBio(e.detail.value!)}
            />
          </IonItem>

         

          <IonButton type="submit" expand="block" className="ion-button" color="dark">
            Save Details
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default PersonalDetails;
