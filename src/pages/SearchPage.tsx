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
  IonImg,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import ProfileSearch from "../pages/ProfileSearch"; // Profile Search Component
import GiftSearchPage from "../pages/GiftSearchPage"; // Gift Search Component
import GiftmeLogo from "../Images/GiftmeLogo.png";
import { chevronBackOutline } from "ionicons/icons";
const SearchTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"gift" | "profiles">(
    "profiles"
  );

  const handleSegmentChange = (e: CustomEvent) => {
    const newValue = e.detail.value as "gift" | "profiles";
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
        <IonIcon 
  icon={chevronBackOutline} 
  slot="start" 
  onClick={() => history.back()} 
  style={{ color: "black" }} 
/>

        <IonImg
            src={GiftmeLogo}
            style={{ width: "100px", height: "70px", marginLeft: "0px" }}
            alt="Gift me logo"
          />
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              <IonSegment value={selectedTab} onIonChange={handleSegmentChange}>
                <IonSegmentButton value="profiles">
                  <IonLabel>Profile Search</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="gift">
                  <IonLabel>Gift Search</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" size-md="8">
              <h5> {selectedTab}</h5>
              {selectedTab === "profiles" && <ProfileSearch />}
              {selectedTab === "gift" && <GiftSearchPage />}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SearchTabs;
