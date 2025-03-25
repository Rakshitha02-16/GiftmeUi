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
  IonTitle
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GiftPost } from "../Models/Gift";
import { postGift } from "../services/giftServices";
import "../pages/giftpost.css";

const PostGift: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState<any>(null);
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

    const giftData: GiftPost = {
      photo: [selectedImage],
      tag: tags || "",
      caption: caption || "",
      location: location ? location.label : "",
    };

    try {
      await postGift(giftData);
      setShowToast(true);
      clearForm();
    } catch (error) {
      console.error("Failed to post gift:", error);
    }
  };

  const clearForm = () => {
    setSelectedImage(null);
    setCaption("");
    setTags("");
    setLocation(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CREATE POST</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="modal-content">
        <div className="modal-inner">
          {/* Image Section */}
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
          {/* Caption Input */}
          <IonItem className="input-field">
            <IonLabel position="floating">Write a caption...</IonLabel>
            <IonInput className="giftinput" value={caption} onIonChange={(e) => setCaption(e.detail.value!)} />
          </IonItem>

          {/* Tags Input */}
          <IonItem className="input-field">
            <IonLabel position="floating">Tag People (comma separated)</IonLabel>
            <IonInput className="giftinput" value={tags} onIonChange={(e) => setTags(e.detail.value!)} />
          </IonItem>

          {/* Location Input (Google Places) */}
          <IonItem className="input-field">
            <IonLabel>Location</IonLabel>
            <GooglePlacesAutocomplete
              apiKey="Y"
              selectProps={{
                value: location,
                onChange: setLocation,
                placeholder: "Search for a location...",
                isClearable: true,
                noOptionsMessage: () => "No suggestions found",
                styles: {
                  control: (provided) => ({
                    ...provided,
                    minHeight: "40px",
                    width: "100%",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                  }),
                },
              }}
            />
          </IonItem>
          {/* Action Buttons */}
          <div className="button-group">
            <IonButton expand="full" className="share-button" onClick={handlePostGift}>
              Share
            </IonButton>
          </div>
        </div>
      </IonContent>

      {/* Success Toast */}
      <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message="Gift posted successfully!" duration={2000} />
    </IonPage>
  );
};

export default PostGift;
