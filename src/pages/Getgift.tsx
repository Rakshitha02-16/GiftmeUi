import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { GiftPost } from "../Models/Gift";

const FeedPage: React.FC = () => {
  const [posts, setPosts] = useState<GiftPost[]>([]);

  useEffect(() => {
    // Retrieve stored posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem("giftPosts") || "[]");
    setPosts(storedPosts);
  }, []);

  return (
    <IonPage>
      <IonContent className="feed-content">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <IonCard key={index}>
              <IonImg src={post.photo[0]} />
              <IonCardHeader>
                <IonCardTitle>{post.caption}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p><strong>Tags:</strong> {post.tag}</p>
                <p><strong>Location:</strong> {post.location}</p>
              </IonCardContent>
            </IonCard>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FeedPage;
