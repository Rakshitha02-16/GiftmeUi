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
import { Item, Wishlist } from "../Models/Item";
import { useParams, useHistory } from "react-router-dom";
import '../pages/WishlistDetails.css';

const WishlistDetails: React.FC<{ userId: number; wishlistName: string }> = ({ userId, wishlistName }) => {
  const { wishlistId, wishlistName: paramWishlistName } = useParams<{ wishlistId: string; wishlistName: string }>();

  const wishlistTitle = decodeURIComponent(paramWishlistName) || "Unnamed";
  
  const history = useHistory();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch items for the specific wishlistId
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const id = parseInt(wishlistId, 10);
        if (isNaN(id)) return;
  
        // ✅ Fetch items from API
        const apiItems = await getItemsByWishlistId(id);
  
        // ✅ Get stored items from Local Storage for the specific wishlist ID
        const storedItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
        const filteredStoredItems = storedItems.filter((item: Item) => item.wishListId === id);
  
        // ✅ Merge API items and local storage items
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
  
  

  // ✅ Navigate to Add Item page with wishlist details
  const handleAddItemClick = () => {
    history.push(`/add-item/${wishlistId}/${wishlistName}`);
  };
history.push(`/wishlist-detail/${wishlistId}/${encodeURIComponent(wishlistName)}`);

  // ✅ Delete all items in the wishlist
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

  // ✅ Delete a single item
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

  // ✅ Share functionality
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
    <IonButton  color="primary" size="small" onClick={handleAddItemClick}>
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
