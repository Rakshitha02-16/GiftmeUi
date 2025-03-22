import { IonButton, IonHeader, IonPage, IonTitle, IonToolbar,IonIcon, IonContent, IonList, IonItemSliding, IonItem, IonAvatar, IonLabel, IonModal, IonCard } from '@ionic/react'
import { close } from 'ionicons/icons';
import React, { useState } from 'react'
import AddGift from './AddGift';
import { bags } from '../data/bags';
import './../pages/Tab1.css'

interface WishlistProps {
   isModalOpen: boolean
   onCloseHandler: () => void
}


const WishList:React.FC<WishlistProps> = ({ isModalOpen, onCloseHandler}) => {

  const [ bagData,setBagData] = useState(bags)
    
  return (
   
    <IonPage>
        <IonHeader>
            <IonToolbar>
            <div style={{display:"flex"}}>
            <IonTitle>Birthday</IonTitle>
            <IonButton style={{marginRight:"20px"}} onClick={onCloseHandler} > <IonIcon slot='icon-only' icon={close} style={{fontSize:"28px"}}></IonIcon></IonButton></div>
            </IonToolbar>
        </IonHeader>
        <IonContent style={{position: "relative" , left:"18px"}}>
        <IonList inset={true}  className='ionList'>
            {bagData.map((item,index)=> (
              <IonCard style={{ height:"160px",margin:"12px",padding:"10px",width:"360px", zIndex:"1000"}}>
          
            <IonItem button={true} key={index} >
              <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                <img alt="" src={item.bagImg} />
              </IonAvatar>
              <div className='itemWrapper'>
              <IonLabel style={{ fontSize: '16px',marginTop:"15px"}}>{item.bagTitle}</IonLabel>
             <p style={{marginTop:'10px'}}>{item.bagDesc}</p></div>
             <div className='priceWrapper'>₹{item.bagPrice.toFixed(1)}</div>
            </IonItem>
            
           
          </IonCard>
           ))}
            </IonList>
            <AddGift/>
            </IonContent>
    </IonPage>
      
    
  )
}

export default WishList