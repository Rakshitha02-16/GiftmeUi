// pages/CommentsPage.tsx
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonImg,
  IonText,
} from "@ionic/react";
import { useParams } from "react-router";
import { CommentData } from "../Models/Feed";
import { commentsService } from "../services/CommentServices";

const CommentsPage: React.FC = () => {
  const { giftId } = useParams<{ giftId: string }>();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const apiComments = await commentsService.getCommentsByGiftId(Number(giftId));
        const localComments: CommentData[] = JSON.parse(localStorage.getItem("localComments") || "[]");
        const filteredLocal = localComments.filter((comment) => comment.giftId === Number(giftId));

        // Combine and sort comments by dateTime
        const combined = [...apiComments, ...filteredLocal].sort((a, b) =>
          new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
        );

        setComments(combined);
      } catch (err: any) {
        setError("Failed to load comments");
      }
    };

    fetchAllComments();
  }, [giftId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Comments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {error && <IonText color="danger">{error}</IonText>}
        {comments.length === 0 ? (
          <IonText>No comments available.</IonText>
        ) : (
          <IonList>
            {comments.map((comment) => (
              <IonItem key={comment.id}>
                <IonAvatar slot="start">
                  <IonImg src={comment.profilePic || "https://via.placeholder.com/150"} />
                </IonAvatar>
                <IonLabel>
                  <h3>User ID: {comment.userId}</h3>
                  <p>{comment.message}</p>
                  <small>{new Date(comment.dateTime).toLocaleString()}</small>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CommentsPage;
