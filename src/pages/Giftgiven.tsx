import React, { useEffect, useState } from 'react';
import { GiftGiven } from '../Models/Gift';
import { getGiftDetails } from '../services/gift';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonText,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent
} from '@ionic/react';

const GiftDetails: React.FC = () => {
  const [gift, setGift] = useState<GiftGiven | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const data = await getGiftDetails(1); // Replace with dynamic ID later
        setGift(data);
      } catch (err: any) {
        setError('Failed to fetch gift details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGift();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Gift Given Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading && <IonSpinner name="crescent" />}
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        {!loading && !error && gift && (
          <IonCard>
            <IonCardContent>
              <IonGrid>
              <IonRow>
                  <IonCol size="12">
                    
                    {gift.photo.length > 0 ? (
                      gift.photo.map((url, idx) => (
                        <IonImg key={idx} src={url} alt={`Gift ${idx}`} style={{ marginTop: '10px', width: '100%' }} />
                      ))
                    ) : (
                      <p>No photos available</p>
                    )}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol><strong>Tag:</strong></IonCol>
                  <IonCol>{gift.tag}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol><strong>Caption:</strong></IonCol>
                  <IonCol>{gift.caption}</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol><strong>Item Name:</strong></IonCol>
                  <IonCol>{gift.itemName || 'N/A'}</IonCol>
                </IonRow>
               
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GiftDetails;
