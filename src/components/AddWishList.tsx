import React,{ useState } from 'react'
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonList, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon,IonToast } from '@ionic/react';
import { addCircleOutline , close } from 'ionicons/icons';
import './AddWishList.css'

interface UploadFormProps {
    onFormSubmit: (wishListTitle: string, wishListImg: string) => void;
  }


const AddWishList:React.FC<UploadFormProps> = ({ onFormSubmit}) => {
    const [showModal,setShowModal] = useState(false)
    const [wishListTitle, setWishListTitle] = useState<string>('')
    const [wishListImg, setWishListImg] = useState('')
    const [showToast, setShowToast] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true)
        
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }

    const wishListTitleHandler = (e: CustomEvent) => {
        setWishListTitle(e.detail.value as string)
    }
    const wishListImgHandler = (e: any) =>{
        const imgFiles = e.target.files[0];
        if( imgFiles ){
            const reader = new FileReader();
            reader.onload =() => {
            setWishListImg(reader.result as string);
        };
        reader.readAsDataURL(imgFiles);
        }
    }
    
    const submitHandler = async(e: React.FormEvent) =>{
        e.preventDefault();

        if(!wishListTitle && !wishListImg){
            setShowToast(true);
            console.log('HELLO')
            return;
        }

        console.log('Submitted Data : ',{wishListTitle, wishListImg});
        onFormSubmit(wishListTitle, wishListImg);
        setWishListTitle('')
        setWishListImg('')
        setShowModal(false)
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
            <IonButton  style={{marginRight:"20px"}}  onClick={handleCloseModal}>
            <IonIcon slot='icon-only' icon={close} style={{fontSize:"28px"}}></IonIcon>
            </IonButton>
            </div>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
     
        <form  onSubmit={submitHandler}>
          <IonList>
            <IonItem >
              <IonLabel position="floating" style={{fontSize:"24px",marginLeft:"14px"}}>WishList Title*</IonLabel>
              <IonInput
                type='text'
                value={wishListTitle}
                onIonChange={wishListTitleHandler}
                style={{height: "80px",fontSize:" 26px",marginTop:"12px",marginLeft:"10px"}}
                required
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" style={{fontSize:"32px", padding:"8px",marginBottom:"15px",marginLeft:"12px"}}>Upload Image*</IonLabel>
              <input
                type='file'
                 accept='image/*'
                 onChange={wishListImgHandler}
                 style={{height: "60px",fontSize:"22px",marginTop:"12px", marginLeft:"14px"}}
                required
              />
            </IonItem>
          </IonList>
          <IonButton type="submit" expand="block" style={{margin:"16px", fontSize:"20px",height:"44px" }} >Submit</IonButton>
        </form>

        {/* <IonToast
        
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Please fill out all fields."
        duration={2000}
        style={{ margin: "10px", fontSize: "20px",width:"270px"}}
        position='middle'
      /> */}
      </IonContent>
    </IonModal>
  </IonContent>
);
};
  


export default AddWishList
