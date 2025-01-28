import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonImg,
  IonSpinner,
  IonAlert,
  IonButton,
  IonIcon,
  IonList
} from "@ionic/react";
import { shareSocialOutline } from 'ionicons/icons'; 
import { getItemsByWishlistId,deleteWishlistItems, deleteWishlistItem, } from "../services/WishlistDetails";
import { Item } from "../interfaces/Models";
import { useParams, useHistory } from "react-router-dom";
import '../pages/WishlistDetails.css';
import { getItemDetails } from "../services/WishlistService"; // Adjust the import path for your project

interface Wishlist {
  id: number;
  name: string;
}
const WishlistDetails: React.FC<{ userId: number }> = ({ userId }) => {
  const { wishlistId } = useParams<{ wishlistId: string }>();
  const history = useHistory();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        setLoading(true);
        const data = await getItemDetails(userId);
        setWishlists(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch wishlists. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlists();
  }, [userId]);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const id = parseInt(wishlistId, 10);
        if (isNaN(id)) {
          
          return;
        }
        const data = await getItemsByWishlistId(id);
        setItems(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [wishlistId]);

  const handleAddItemClick = () => {
    history.push(`/add-item`);
  };
  const handleDeleteItemClick = async () => {
    try {
      setLoading(true);
      const id = parseInt(wishlistId, 10);
      if (isNaN(id)) {
        
        return;
      }
      await deleteWishlistItems(id);
      setItems([]); // Clear the items after successful deletion
    } catch (err: any) {
      setError(err.message || "Failed to delete wishlist items.");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteItem = async (itemId: number) => {
    try {
      setLoading(true);
      const id = parseInt(wishlistId, 10);
      if (isNaN(id)) {
        
        return;
      }
      await deleteWishlistItem(id, itemId);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId)); // Remove the deleted item from the state
    } catch (err: any) {
      setError(err.message || "Failed to delete item.");
    } finally {
      setLoading(false);
    }
  };
  const handleShare = async () => {
    try {
      // Check if Web Share API is available
      if (navigator.share) {
        await navigator.share({
          title: "Check out this awesome item!",
          text: "This is a great item you might like. Check it out!",
          url: "https://example.com",  // URL to share
        });
      } else {
        // Handle the case where Web Share API is not available
        setError("Sharing is not supported on this platform.");
        
      }
    } catch (err: any) {
      setError("Error sharing: " + err.message);
      
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wishlist Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {wishlists.length > 0 ? (
          <IonList>
            {wishlists.map((wishlist) => (
              <IonItem key={wishlist.id}>
                <IonLabel>{wishlist.name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        ) : (
          <p>No wishlists found.</p>
        )}
      </IonContent>
      <IonContent >
  {loading && <IonSpinner />}
  <IonAlert
    isOpen={!!error}
    onDidDismiss={() => setError(null)}
    header="Error"
    message={error || ""}
    buttons={["OK"]}
  />
  <IonButton
    color="primary"
    onClick={handleAddItemClick}
    className="add-item-button"
  >
    +
  </IonButton>
  <IonButton
    color="danger"
    onClick={handleDeleteItemClick}
    className="delete-item-button"
  >
    Delete
  </IonButton>
  
  <div className="item-list">
    {items.map((item) => (
      <IonItem key={item.id} className="item-card">
       
        <IonImg src={item.photo || "https://via.placeholder.com/150"} />
       
        <IonLabel>
       
        <div className="item-container">
      <h3>
        <strong>Item Name:</strong> {item.name}
      </h3>
      <IonIcon icon={shareSocialOutline} onClick={handleShare} className="share-icon" />
    </div>
          <h3> <strong>Description:</strong>{item.description}</h3>
          <h3>
            <strong>Price:</strong> ${item.price}
          </h3>
          <div className="button-container">
  <IonButton
    onClick={() => handleDeleteItem(item.id)}
    className="custom-button delete-button"
  >
    Delete
  </IonButton>
  <IonButton className="custom-button buy-button">
    Buy Now
  </IonButton>

        </div>

  
        </IonLabel>
       
      </IonItem>
    ))}
  </div>
</IonContent>

    </IonPage>
  );
};

export default WishlistDetails;
