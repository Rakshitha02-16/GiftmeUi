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
  IonInput,IonAvatar
} from "@ionic/react";
import { home, people, add, search, person, chatbubbleOutline, heartOutline, shareSocialOutline } from "ionicons/icons";
import { GiftPosts } from "../Models/Gift";
import { fetchGiftsFromAPI } from "../services/giftServices";
import { commentsService } from "../services/CommentServices"; // ✅ this is used for posting comments
import { feedactions} from "../services/FeedActions"; // ✅ renamed to avoid name conflict // ✅ this is used for like/share counts etc.

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<GiftPosts[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [comments, setComments] = useState<{ [key: number]: number }>({});
  const [shares, setShares] = useState<{ [key: number]: number }>({});
  const [commentInput, setCommentInput] = useState<{ [key: number]: string }>({});
  const [commentCounts, setCommentCounts] = useState<{ [key: number]: number }>({});

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
        // Fetch from API
        const apiGifts = await fetchGiftsFromAPI();

        // Fetch from local storage
        const storedGifts = JSON.parse(localStorage.getItem("giftPosts") || "[]");

        // Merge API and local storage gifts
        const combinedGifts = [...storedGifts, ...apiGifts];

        setPosts(combinedGifts);
      } catch (error) {
        console.error("Error fetching gifts:", error);
      }
    };

    fetchGifts();
  }, []);
  const fetchCounts = async (giftId: number) => {
    try {
      const likeCount = await feedactions.getLikeCount(giftId);
      const commentCount = await feedactions.getCommentCount(giftId);
      const shareCount = await feedactions.getShareCount(giftId);

      setLikes((prev) => ({ ...prev, [giftId]: likeCount }));
      setCommentCounts((prev) => ({ ...prev, [giftId]: commentCount }));
      setShares((prev) => ({ ...prev, [giftId]: shareCount }));
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const handleLike = async (giftId: number) => {
    await feedactions.likeGift(giftId);
    fetchCounts(giftId);
  };
  const handleComment = async (giftId: number) => {
    if (commentInput[giftId]) {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = storedUser.id || 1;
      const profilePic = storedUser.profilePicture || null;

      await commentsService.postComment(
        giftId,
        commentInput[giftId],
        userId,
        profilePic
      );
      fetchCounts(giftId);
      setCommentInput((prev) => ({ ...prev, [giftId]: "" }));
    }
  };

  const handleShare = async (giftId: number) => {
    await feedactions.shareGift(giftId);
    fetchCounts(giftId);
  };

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
          posts.map((post) => (
            <IonCard key={post.id} className="gift-card">
              {/* User Info */}
              <IonItem>
  <IonAvatar slot="start">
    <IonImg src={user.profilePicture} className="profile-pic" />
  </IonAvatar>
  <IonLabel>{user.name}</IonLabel>
</IonItem>

              {/* Gift Image */}
              {post.photo.length > 0 ? <IonImg src={post.photo[0]} className="gift-image" /> : <p>No Image Available</p>}

              {/* Caption */}
              <IonCardContent>
                <p><strong>Caption:</strong> {post.caption}</p>
                <p><strong>Tags:</strong> {post.tag}</p>
              </IonCardContent>

              {/* Action Buttons */}
              <div className="action-buttons">
                <IonButton className="no-bg" fill="clear" onClick={() => handleLike(post.id)}>
                  <IonIcon icon={heartOutline} color="danger" />
                  {likes[post.id] || 0}
                </IonButton>

                <IonButton className="no-bg" fill="clear" routerLink={`/comments/${post.id}`}>
                  <IonIcon icon={chatbubbleOutline} />
                  {comments[post.id] || 0}
                </IonButton>

                <IonButton className="no-bg" fill="clear" onClick={() => handleShare(post.id)}>
                  <IonIcon icon={shareSocialOutline} />
                  {shares[post.id] || 0}
                </IonButton>
              </div>

              {/* Comment Input */}
              <IonItem>
                <IonInput
                  value={commentInput[post.id] || ""}
                  placeholder="Write a comment..."
                  onIonChange={(e) =>
                    setCommentInput((prev) => ({ ...prev, [post.id]: e.detail.value! }))
                  }
                />
                <IonButton fill="clear" onClick={() => handleComment(post.id)}>Post</IonButton>

              </IonItem>
            </IonCard>
          ))
        ) : (
          <p>No gifts available.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
