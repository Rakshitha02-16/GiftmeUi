import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { getUserSummary } from '../services/UserProfile';

const FollowGiftTracker: React.FC = () => {
  const history = useHistory();
  const [summary, setSummary] = useState({
    followerCount: 0,
    followeeCount: 0,
    giftGiven: 0,
    giftReceived: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      const userId = 1; 
      const data = await getUserSummary(userId);
      setSummary(data);
    };
    fetchSummary();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <h1>Follow & Gift Tracker</h1>
        <div>
          <IonButton onClick={() => history.push('/followers')}>
            Followers ({summary.followerCount})
          </IonButton>
          <IonButton onClick={() => history.push('/following')}>
            Following ({summary.followeeCount})
          </IonButton>
          <IonButton onClick={() => history.push('/gifts-given')}>
            Gifts Given ({summary.giftGiven})
          </IonButton>
          <IonButton onClick={() => history.push('/gifts-taken')}>
            Gifts Taken ({summary.giftReceived})
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FollowGiftTracker;
