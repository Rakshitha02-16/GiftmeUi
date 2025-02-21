import React, { useState } from "react";
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonContent, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from "@ionic/react";
import ProfileSearch from "../pages/ProfileSearch"; // Profile Search Component
import GiftSearchPage from "../pages/GiftSearchPage"; // Gift Search Component
import GiftmeLogo from '../Images/GiftmeLogo.png';

const SearchTabs: React.FC = () => {
  // Initially set "profile" as active
  const [selectedTab, setSelectedTab] = useState<"gift" | "profile">("profile");

  const handleSegmentChange = (e: CustomEvent) => {
    const newValue = e.detail.value as "gift" | "profile";
    console.log("Segment changed to:", newValue); // Debugging
    if (newValue) {
      setSelectedTab(newValue);
    }
  };

  return (
    <IonPage>
      {/* Header Section */}
      <IonHeader>
        <IonToolbar>
          <IonImg
            src={GiftmeLogo}
            style={{ width: '100px', height: '70px', marginLeft: '150px' }} 
            alt="Gift me logo"
          />
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              {/* Segment Tabs */}
              <IonSegment value={selectedTab} onIonChange={handleSegmentChange}>
                <IonSegmentButton value="profile">
                  <IonLabel>Profile Search</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="gift">
                  <IonLabel>Gift Search</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>

          {/* Render Components Based on Selected Tab */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              {/* Initially show ProfileSearch */}
              {selectedTab === "profile" && <ProfileSearch />}
              {selectedTab === "gift" && <GiftSearchPage />}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SearchTabs;
