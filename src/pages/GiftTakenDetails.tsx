// src/pages/GiftTakenDetails.tsx
import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import { GiftTaken } from '../Models/Gift';
import { getGiftTakenDetails } from '../services/gift';

const GiftTakenDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gift, setGift] = useState<GiftTaken | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGift = async () => {
      try {
        if (id) {
          const data = await getGiftTakenDetails(parseInt(id));
          setGift(data);
        }
      } catch (err) {
        setError('Failed to fetch gift taken details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGift();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Gift Taken Details</IonTitle>
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
                  <IonCol><strong>Item Name:</strong></IonCol>
                  <IonCol>{gift.itemName || 'N/A'}</IonCol>
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
                  <IonCol size="12">
                    <strong>Photos:</strong>
                    {gift.photo.length > 0 ? (
                      gift.photo.map((url, idx) => (
                        <IonImg key={idx} src={url} alt={`Gift ${idx}`} style={{ marginTop: '10px', width: '100%' }} />
                      ))
                    ) : (
                      <p>No photos available</p>
                    )}
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GiftTakenDetails;
