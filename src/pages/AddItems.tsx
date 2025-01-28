import React, { useState } from "react";
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
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { addItem } from "../services/AddItemServices";
import { Item } from "../interfaces/Models";
import imageCompression from "browser-image-compression";

const AddItems: React.FC = () => {
  const [formData, setFormData] = useState<Item>({
    id: 0,
    name: "",
    photo: "",
    description: "",
    price: 0,
    wishListId: 1,
    source: "web",
    isDeleted: false,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setPhotoPreview(result);
          setFormData((prev) => ({ ...prev, photo: result }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (err) {
        setError("Failed to process image. Please try again.");
        setShowAlert(true);
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.photo || formData.price <= 0) {
      setError("All fields are required and price must be greater than $0.");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      await addItem(formData);
      history.push(`/wishlist-detail/${formData.wishListId}`);
    } catch (err: any) {
      setError(err.message);
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
        {loading && <IonSpinner />}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Error"
          message={error || ""}
          buttons={["OK"]}
        />
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
          >
            <IonLabel slot="start">$1</IonLabel>
            <IonLabel slot="end">$1000</IonLabel>
          </IonRange>
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
      </IonContent>
    </IonPage>
  );
};

export default AddItems;
