import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonAvatar,
  IonText,
  IonButton,
} from "@ionic/react";
import { User } from "../Models/User";
import { searchProfiles } from "../services/SearchPage";
import "../pages/ProfileSearch.css";

const ProfileSearch: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (searchText.trim().length > 2) {
      searchProfiles(searchText)
        .then((data) => {
          console.log("Fetched Profiles:", data); // Debugging
          setUsers(data ?? []); // Ensure profiles is always an array
        })
        .catch((error) => {
          console.error("Error fetching profiles:", error);
          setUsers([]); // Reset profiles on error
        });
    } else {
      setUsers([]);
    }
  }, [searchText]);

  return (
    <IonContent>
      <IonSearchbar
        value={searchText}
        debounce={500}
        onIonInput={(e) => setSearchText(e.detail.value ?? "")}
        placeholder="Search profiles..."
        style={{
          marginTop: "10px",
          marginBottom: "15px",
          width: "95%",
          margin: "10px auto",
          display: "block",
        }}
      />
      <IonList>
      {users.length === 0 ? (
  <IonText>No profiles found.</IonText>
) : (
  users.map((user) => (
    <IonItem key={user.id} button>
      <IonAvatar slot="start">
        <img src={user.profilePicture} alt={user.name} />
      </IonAvatar>
      <IonText>{user.name}</IonText>
      <IonButton slot="end">Follow</IonButton>
    </IonItem>
  ))
)}

      </IonList>
    </IonContent>
  );
};

export default ProfileSearch;
