import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonList, IonItem, IonAvatar, IonLabel, IonButton } from '@ionic/react';
import { getFollowers, unfollowUser } from '../services/followersServices';
import { Follow } from '../Models/Follow';

const FollowersList: React.FC = () => {
  const [followers, setFollowers] = useState<Follow[]>([]);
  const userId = 1; 

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await getFollowers(userId);
        setFollowers(response);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, []);

  const handleUnfollow = async (followerId: number) => {
    try {
      await unfollowUser(userId, followerId);
      setFollowers(followers.filter(f => f.id !== followerId));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonList>
          {followers.map(follower => (
            <IonItem key={follower.id}>
              <IonAvatar slot="start">
                <img src={follower.profilePicture || 'default-profile.png'} alt="Profile" />
              </IonAvatar>
              <IonLabel>{follower.userName || 'Unknown User'}</IonLabel>
              <IonButton color="danger" onClick={() => handleUnfollow(follower.id)}>Unfollow</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FollowersList;
