import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonList, IonItem, IonAvatar, IonLabel, IonButton } from '@ionic/react';
import { getFollowing, unfollowUser } from '../services/followingServices';
import { Following } from '../Models/Follow';

const FollowingList: React.FC = () => {
  const [following, setFollowing] = useState<Following[]>([]);
  const userId = 1; // Replace with actual user ID

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await getFollowing(userId);
        setFollowing(response);
      } catch (error) {
        console.error('Error fetching following:', error);
      }
    };
    fetchFollowing();
  }, []);

  const handleUnfollow = async (followeeId: number) => {
    try {
      await unfollowUser(userId, followeeId);
      setFollowing(following.filter(f => f.followeeId !== followeeId));
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonList>
          {following.map(follow => (
            <IonItem key={follow.id}>
              <IonAvatar slot="start">
                <img src={follow.profilePhoto || 'default-profile.png'} alt="Profile" />
              </IonAvatar>
              <IonLabel>{follow.followeeName}</IonLabel>
              <IonButton color="danger" onClick={() => handleUnfollow(follow.followeeId)}>
                Unfollow
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FollowingList;
