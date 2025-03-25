import React from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonRouterOutlet,
  IonButton,
  IonInput,
  IonFooter,
  IonLabel
} from '@ionic/react';
import { home, people, add, search, person } from 'ionicons/icons';


const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
      <IonTabBar slot="top">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="friends" href="/friends">
            <IonIcon icon={people} />
            <IonLabel>Friends</IonLabel>
          </IonTabButton>
          <IonTabButton tab="gift" href="/giftpost">
            <IonIcon icon={add} />
            <IonLabel>Post</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/SearchPage">
            <IonIcon icon={search} />
            <IonLabel>SearchPage</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/tab3">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonHeader>
      
    </IonPage>
  );
};

export default HomePage;
