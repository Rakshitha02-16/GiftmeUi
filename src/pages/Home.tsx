import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonCard,
  IonCardContent,
  IonImg,
  IonItem,
  IonButton,
  IonInput,
  IonAvatar,
} from "@ionic/react";
import {
  home,
  people,
  add,
  search,
  person,
  chatbubbleOutline,
  heartOutline,
  shareSocialOutline,
  heart,
} from "ionicons/icons";
import { GiftPosts } from "../Models/Gift";
import { fetchGiftsFromAPI } from "../services/giftServices";
import { getLikesByUser, postLike } from "../services/LikeServices";
import GiftmeLogo from "../Images/GiftmeLogo.png";

// ✅ Define the props type
interface LikeButtonProps {
  userId: number;
}

const HomePage: React.FC<LikeButtonProps> = ({ userId }) => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [posts, setPosts] = useState<GiftPosts[]>([]);
  const [user, setUser] = useState<{ name: string; profilePicture: string }>({
    name: "",
    profilePicture: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser.name && storedUser.profilePicture) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const apiGifts = await fetchGiftsFromAPI();
        const storedGifts = JSON.parse(localStorage.getItem("giftPosts") || "[]");
        const combinedGifts = [...storedGifts, ...apiGifts];
        setPosts(combinedGifts);
      } catch (error) {
        console.error("Error fetching gifts:", error);
      }
    };

    fetchGifts();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const userLikes = await getLikesByUser(userId);
        setLikedPosts(userLikes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [userId]);

  const handleLike = async (postId: number) => {
    try {
      const result = await postLike(postId, userId);
      if (result === true) {
        setLikedPosts((prev) => [...prev, postId]);
        setLikes((prev) => ({
          ...prev,
          [postId]: (prev[postId] || 0) + 1,
        }));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonTabBar slot="top">
          <IonTabButton tab="logo" href="/home">
            <IonImg
              src={GiftmeLogo}
              style={{ width: "100px", height: "70px", marginLeft: "0px" }}
              alt="Gift me logo"
            />
          </IonTabButton>
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="gift" href="/giftpost">
            <IonIcon icon={add} />
            <IonLabel>Post</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/SearchPage">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/tab3">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonHeader>

      <IonContent>
        {posts.length > 0 ? (
          posts.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            return (
              <IonCard key={post.id} className="gift-card">
                <IonItem>
                  <IonAvatar slot="start">
                    <IonImg src={user.profilePicture} className="profile-pic" />
                  </IonAvatar>
                  <IonLabel>{user.name}</IonLabel>
                </IonItem>

                {post.photo.length > 0 ? (
                  <IonImg src={post.photo[0]} className="gift-image" />
                ) : (
                  <p>No Image Available</p>
                )}

                <IonCardContent>
                  <p>
                    <strong>Caption:</strong> {post.caption}
                  </p>
                  <p>
                    <strong>Tags:</strong> {post.tag}
                  </p>
                </IonCardContent>

                <div className="action-buttons">
                  <IonButton className="no-bg" fill="clear" onClick={() => handleLike(post.id)}>
                    <IonIcon icon={isLiked ? heart : heartOutline} color="danger" />
                    <span style={{ marginLeft: "5px" }}>{likes[post.id] || 0}</span>
                  </IonButton>

                  <IonButton className="no-bg" fill="clear">
                    <IonIcon icon={chatbubbleOutline} />
                  </IonButton>

                  <IonButton className="no-bg" fill="clear">
                    <IonIcon icon={shareSocialOutline} />
                  </IonButton>
                </div>

                <IonItem>{/* Comment input area is currently commented out */}</IonItem>
              </IonCard>
            );
          })
        ) : (
          <p>No gifts available.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
