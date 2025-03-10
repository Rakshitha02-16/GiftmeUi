import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonImg,
  IonButton,
  IonIcon
} from "@ionic/react";
import { shareSocialOutline } from "ionicons/icons"; 
import { getItemsByWishlistId, deleteWishlistItems, deleteWishlistItem } from "../services/WishlistDetails";
import { Item } from "../Models/Item";
import { useParams, useHistory } from "react-router-dom";
import '../pages/WishlistDetails.css';

const WishlistDetails: React.FC<{ userId: number; wishlistName: string }> = ({ userId, wishlistName }) => {
  

  const history = useHistory();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 
// Fallback mechanism to ensure wishlistTitle is always assigned
const { wishlistId, wishlistName: paramWishlistName } = useParams<{ wishlistId: string; wishlistName: string }>();

// Fallback mechanism to ensure wishlistTitle is always assigned
const storedTitle = localStorage.getItem("wishlistTitle");

const wishlistTitle = paramWishlistName 
  ? decodeURIComponent(paramWishlistName) 
  : storedTitle || wishlistName; // Use storedTitle or prop as fallback

useEffect(() => {
  if (wishlistTitle && wishlistTitle !== "Unnamed") {
    localStorage.setItem("wishlistTitle", wishlistTitle);
  }
}, [wishlistTitle]);

  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const id = parseInt(wishlistId, 10);
        if (isNaN(id)) return;
  
       
        const apiItems = await getItemsByWishlistId(id);
  
        
        const storedItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
        const filteredStoredItems = storedItems.filter((item: Item) => item.wishListId === id);
  
        
        const mergedItems = [...filteredStoredItems, ...apiItems];
  
        setItems(mergedItems);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchItems();
  }, [wishlistId]);
  
  

  const handleAddItemClick = () => {
    history.push(`/add-item/${wishlistId}/${encodeURIComponent(wishlistTitle)}`);
  };
  



  const handleDeleteAllItems = async () => {
    if (!window.confirm("Are you sure you want to delete all items?")) return;

    setLoading(true);
    try {
      await deleteWishlistItems(parseInt(wishlistId, 10));
      setItems([]);
    } catch (error) {
      console.error("Failed to delete wishlist items:", error);
    } finally {
      setLoading(false);
    }
  };

 
  const handleDeleteItem = async (itemId: number) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    setLoading(true);
    try {
      await deleteWishlistItem(parseInt(wishlistId, 10), itemId);
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this awesome item!",
          text: "This is a great item you might like. Check it out!",
          url: "https://example.com", // Update this with actual item URL
        });
      } else {
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
        <IonTitle>{` ${wishlistTitle} `}</IonTitle>
        {/* {`Wishlist: ${wishlistTitle} (ID: ${wishlistId})`} */}

        </IonToolbar>
      </IonHeader>

      <IonContent className="wishlist-content">
  {error && <p className="error-message">{error}</p>}

 

  <div className="wishlist-actions">
  <h5 className="wishlist-title">{wishlistTitle}</h5>
  <div className="wishlist-buttons">
    <IonButton   size="small" onClick={handleAddItemClick}>
      Add Item
    </IonButton>
    {items.length > 0 && (
      <IonButton color="danger" size="small" onClick={handleDeleteAllItems}>
        Delete All
      </IonButton>
    )}
  </div>
</div>


  <div className="item-list">
    {items.map((item) => (
      <IonItem key={item.id} className="item-card">
        <IonImg src={item.photo || "https://via.placeholder.com/150"} className="item-image" />
        <IonLabel>
          <div className="item-container">
          <IonIcon icon={shareSocialOutline} onClick={handleShare} className="share-icon" />
            <h3>
              <strong>Item Name:</strong> {item.name}
            </h3>
           
          </div>
          <h3>
            <strong>Description:</strong> {item.description}
          </h3>
          <h3>
            <strong>Price:</strong> ${item.price}
          </h3>
          <div className="button-container">
            <IonButton onClick={() => handleDeleteItem(item.id)} className="custom-button delete-button">
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
