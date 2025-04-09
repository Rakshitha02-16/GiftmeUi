import React, { useState } from "react";
import {
  IonPage,
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonItem,
  IonToast,
  IonImg,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon
  
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { GiftPost } from "../Models/Gift";
import { useHistory } from "react-router-dom";
import { chevronBackOutline } from "ionicons/icons";
import GiftmeLogo from "../Images/GiftmeLogo.png";
import "../pages/giftpost.css";

const PostGift: React.FC = () => {
  const history = useHistory();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [showToast, setShowToast] = useState(false);

  const selectImageFromGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      setSelectedImage(image.dataUrl || null);
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const handlePostGift = async () => {
    if (!selectedImage) {
      console.error("No image selected!");
      return;
    }

    const newGiftPost: GiftPost = {
      photo: [selectedImage],
      tag: tags || "",
      caption: caption || "",
    };

    try {
      const existingPosts = JSON.parse(localStorage.getItem("giftPosts") || "[]");
      const updatedPosts = [newGiftPost, ...existingPosts];
      localStorage.setItem("giftPosts", JSON.stringify(updatedPosts));

      setShowToast(true);
      clearForm();
      setTimeout(() => {
        history.push("/home");
      }, 2000);
    } catch (error) {
      console.error("Failed to post gift:", error);
    }
  };

  const clearForm = () => {
    setSelectedImage(null);
    setCaption("");
    setTags("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonIcon 
          icon={chevronBackOutline} 
          slot="start" 
          onClick={() => history.goBack()} 
          style={{ color: "black" }} 
        />
        <IonImg
            src={GiftmeLogo}
            style={{ width: "100px", height: "70px", marginLeft: "0px" }}
            alt="Gift me logo"
          />
          <IonTitle>CREATE POST</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="modal-content">
        <div className="modal-inner">
          {selectedImage ? (
            <div className="image-preview">
              <IonImg className="post-image" src={selectedImage} />
              <div className="image-actions">
                <IonButton size="small" onClick={selectImageFromGallery}>
                  Change Image
                </IonButton>
                <IonButton size="small" onClick={() => setSelectedImage(null)} color="danger">
                  Remove Image
                </IonButton>
              </div>
            </div>
          ) : (
            <IonButton expand="full" className="select-image-btn" onClick={selectImageFromGallery}>
              Select Image from Gallery
            </IonButton>
          )}

          <IonItem className="input-field">
            <IonLabel position="floating">Write a caption...</IonLabel>
            <IonInput className="giftinput" value={caption} onIonChange={(e) => setCaption(e.detail.value!)} />
          </IonItem>

          <IonItem className="input-field">
            <IonLabel position="floating">Tag People (comma separated)</IonLabel>
            <IonInput className="giftinput" value={tags} onIonChange={(e) => setTags(e.detail.value!)} />
          </IonItem>

          <div className="button-group">
            <IonButton expand="full" className="share-button" onClick={handlePostGift}>
              Share
            </IonButton>
          </div>
        </div>
      </IonContent>

      <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message="Gift posted successfully!" duration={2000} />
    </IonPage>
  );
};

export default PostGift;
