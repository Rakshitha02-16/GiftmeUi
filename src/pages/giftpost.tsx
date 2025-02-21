import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonModal,
  IonContent,
  IonInput,
  IonLabel,
  IonItem,
  IonToast,
  IonImg,
} from "@ionic/react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import GooglePlacesAutocomplete from "react-google-places-autocomplete"; // Import Google Places
import { GiftPost } from "../Models/Gift"; // API Model
import { postGift } from "../services/giftpostServices"; // API Call
import "../pages/giftpost.css"
const PostGift: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showModal) {
      selectImageFromGallery();
    }
  }, [showModal]);

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
      photo: [selectedImage], // Check if backend supports base64
      tag: tags || "", // Ensure no null values
      caption: caption || "",
      location: location ? location.label : "", // Send location string
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
    <div className="create-post-container">
    {/* Floating Button for Opening Modal */}
    <IonButton className="add-post-button" onClick={() => setShowModal(true)}>
      +
    </IonButton>
  
    {/* Modal Component */}
    <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
      <IonContent className="modal-content">
        <div className="modal-inner">
          <h2 className="modal-title">Create a New Post</h2>
  
          {/* Image Section */}
          {selectedImage ? (
            <div className="image-preview">
              <IonImg className="post-image" src={selectedImage} />
              <div className="image-actions">
                <IonButton size="small" onClick={selectImageFromGallery} color="secondary">
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
            <IonInput value={caption} onIonChange={(e) => setCaption(e.detail.value!)} />
          </IonItem>
  
          {/* Tags Input */}
          <IonItem className="input-field">
            <IonLabel position="floating">Tag People (comma separated)</IonLabel>
            <IonInput value={tags} onIonChange={(e) => setTags(e.detail.value!)} />
          </IonItem>
  
          {/* Location Input (Google Places) */}
          <IonItem className="input-field">
            <IonLabel>Location</IonLabel>
            <GooglePlacesAutocomplete
              apiKey="YOUR_GOOGLE_API_KEY"
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
            <IonButton expand="full" className="cancel-button" onClick={() => setShowModal(false)} color="medium">
              Cancel
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  
    {/* Success Toast */}
    <IonToast isOpen={showToast} onDidDismiss={() => setShowToast(false)} message="Gift posted successfully!" duration={2000} />
  </div>
  
  );
};

export default PostGift;
