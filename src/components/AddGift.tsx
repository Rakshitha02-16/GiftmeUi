import React,{ useState } from 'react'
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon,IonToast } from '@ionic/react';
import { addCircleOutline , close } from 'ionicons/icons';
import './AddWishList.css'

const AddGift:React.FC = () => {
    const [showModal,setShowModal] = useState(false)
    const [giftTitle, setGiftTitle] = useState<string>('')
    const [giftDesc , setGiftDesc] = useState<string>('')
    const [giftPrice, setGiftPrice] = useState<number>()
    const [wishListImg, setWishListImg] = useState<File | null>(null)
    const [showToast, setShowToast] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true)
        
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }

    const giftTitleHandler = (e: CustomEvent) => {
        setGiftTitle(e.detail.value as string)
    }
    const giftDescHandler = (e: CustomEvent) => {
        setGiftDesc(e.detail.value as string)
    }
    const giftPriceHandler = (e: CustomEvent) => {
        const giftValue = parseInt(e.detail.value ,10)
        setGiftPrice(giftValue )
    }
    const wishListImgHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const imgFiles = e.target.files;
        if( imgFiles && imgFiles.length > 0){
            setWishListImg(imgFiles[0])
        }
    }
    
    const submitHandler = async(e: React.FormEvent) =>{
        e.preventDefault();

        if(!giftTitle || !giftPrice || !wishListImg){
            setShowToast(true);
            console.log('HELLO')
            return;
        }

        console.log('Submitted Data : ',{giftTitle,giftDesc ,giftPrice, wishListImg});

        setGiftTitle('')
        setGiftDesc('')
        setGiftPrice(0)
        setWishListImg(null)
    }
  return (
    <IonContent className='addWishListContent'>
    <IonButton  className='addWishListButton' onClick={handleOpenModal}>
      <IonIcon slot='icon-only' icon={addCircleOutline}  className='addWishListIcon'/>
      
    </IonButton>
    <IonModal  isOpen={showModal}  >
      <IonHeader>
        <IonToolbar style={{padding:"4px"}}>
            <div style={{display:"flex"}}>
          <IonTitle  style={{fontSize:"24px",marginLeft:"20px"}}>Add Item</IonTitle>
            <IonButton  style={{marginRight:"22px"}}  onClick={handleCloseModal}>
            <IonIcon slot='icon-only' icon={close} style={{fontSize:"28px"}}></IonIcon>
            </IonButton>
            </div>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
     
        <form  onSubmit={submitHandler}>
          <IonList>
            <IonItem >
              <IonLabel position="floating" style={{fontSize:"24px",marginLeft:"12px"}}>Gift*</IonLabel>
              <IonInput
                type='text'
                value={giftTitle}
                onIonChange={giftTitleHandler}
                style={{height: "80px",fontSize:" 26px",marginTop:"12px", marginLeft:"10px"}}
                required
              />
            </IonItem>
            <IonItem >
              <IonLabel position="floating" style={{fontSize:"24px",marginLeft:"10px"}}>Gift Description</IonLabel>
              <IonInput
                type='text'
                value={giftDesc}
                onIonChange={giftDescHandler}
                style={{height: "80px",fontSize:" 26px",marginTop:"12px", marginLeft:"12px"}}
                required
              />
            </IonItem>
            <IonItem >
              <IonLabel position="floating" style={{fontSize:"24px",marginLeft:"10px"}}>Gift Price Range*</IonLabel>
              <IonInput
                type='text'
                value={giftPrice}
                onIonChange={giftPriceHandler}
                style={{height: "80px",fontSize:" 26px",marginTop:"12px", marginLeft:"12px"}}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" style={{fontSize:"32px", padding:"8px",marginBottom:"15px"}}>Upload Image*</IonLabel>
              <input
                type='file'
                 accept='image/*'
                 onChange={wishListImgHandler}
                 style={{height: "60px",fontSize:"22px",marginTop:"12px", marginLeft:"12px"}}
                required
              />
            </IonItem>
          </IonList>
          <IonButton type="submit" expand="block" style={{margin:"16px", fontSize:"20px",height:"44px" }}>Submit</IonButton>
        </form>

        <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Please fill out all fields."
        duration={2000}
       
      />
      </IonContent>
    </IonModal>
  </IonContent>
);
};
  


export default AddGift
