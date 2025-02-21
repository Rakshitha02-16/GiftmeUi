import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonTextarea,
  IonButton,
  IonItem,
  IonLabel,
  IonAlert,
  IonImg,
  IonRange,
  IonSpinner,
  IonLoading,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { addItem } from "../services/AddItemServices";
import { Item } from "../Models/Item";
import imageCompression from "browser-image-compression";

const AddItems: React.FC = () => {
  const { wishlistId, wishlistName } = useParams<{ wishlistId: string; wishlistName: string }>();
  const history = useHistory();

  const [formData, setFormData] = useState<Item>({
    id: Date.now(),
    name: "",
    photo: "",
    description: "",
    price: 1,
    wishListId: parseInt(wishlistId, 10) || 1, // Ensure wishListId is correctly set
    source: "web",
    isDeleted: false,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    console.log("Wishlist ID:", wishlistId);
    console.log("Wishlist Name:", wishlistName);
  }, [wishlistId, wishlistName]);

  const handleInputChange = (field: keyof Item, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "price" ? Number(value) : value,
    }));
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setShowLoading(true);
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPhotoPreview(result);
          setFormData((prev) => ({ ...prev, photo: result }));
          setShowLoading(false);
        };
        reader.readAsDataURL(compressedFile);
      } catch (err) {
        setError("Failed to process image. Please try again.");
        setShowAlert(true);
        setShowLoading(false);
      }
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Item name is required.";
    if (!formData.photo) return "Please upload an image.";
    if (formData.price <= 0) return "Price must be greater than $0.";
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        wishListId: parseInt(wishlistId, 10),
      };

      console.log("Sending Data:", payload);

      await addItem(payload);

      // Save item to local storage
      const storedItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
      localStorage.setItem("wishlistItems", JSON.stringify([...storedItems, payload]));

      history.push(`/wishlist-detail/${wishlistId}/${wishlistName}`);
    } catch (err: any) {
      console.error("API Error:", err);
      setError(err.message || "Failed to add item.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Item</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonLoading isOpen={showLoading} message="Processing Image..." />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message={error || ""}
          buttons={["OK"]}
        />

        {loading && <IonSpinner />}

        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput
            value={formData.name}
            placeholder="Enter item name"
            onIonChange={(e) => handleInputChange("name", e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Price</IonLabel>
          <IonRange
            min={1}
            max={1000}
            value={formData.price}
            onIonChange={(e) => handleInputChange("price", e.detail.value as number)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Photo</IonLabel>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {photoPreview && <IonImg src={photoPreview} />}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Description</IonLabel>
          <IonTextarea
            value={formData.description}
            placeholder="Enter description"
            onIonChange={(e) => handleInputChange("description", e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="full" onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Item"}
        </IonButton>

        {/* Cancel Button */}
        <IonButton expand="full" color="medium" onClick={() => history.goBack()}>
          Cancel
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddItems;
