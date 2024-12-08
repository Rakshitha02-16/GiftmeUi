import React, { useState } from 'react';
import {  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButton,
  IonModal,
  IonButtons, } from '@ionic/react';
  import { pin, share, trash } from 'ionicons/icons';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bags & Wallets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => setIsOpen(true)}>
          Open
        </IonButton>
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Bags & Wallets</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
          <IonList inset={true}  className='ionList'>
          <IonItemSliding>
            <IonItem button={true} >
              <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                <img alt="" src="https://gift.me/assets/store/fendi.png" />
              </IonAvatar>
              <div className='itemWrapper'>
              <IonLabel style={{ fontSize: '16px'}}>Fendi Handbag</IonLabel>
             <p style={{marginTop:'3px'}}>Your take- everywhere tote.Elevate your casual daytime look with our roomy tote bag.</p></div>
            </IonItem>
            <IonItemOptions slot="end">
              <IonItemOption color="warning">
                <IonIcon slot="icon-only" icon={pin}></IonIcon>
              </IonItemOption>
              <IonItemOption color="tertiary">
                <IonIcon slot="icon-only" icon={share}></IonIcon>
              </IonItemOption>
              <IonItemOption color="danger" expandable={true}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItem button={true}>
              <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                <img alt="" src="https://gift.me/assets/store/dolce_and_gabanna.png" />
              </IonAvatar>
              <div className='itemWrapper'>
              <IonLabel  style={{ fontSize: '16px'}}>Gucci</IonLabel>
             <p style={{marginTop:'3px'}}>Your take- everywhere tote.Elevate your casual daytime look with our roomy tote bag.</p></div>
            </IonItem>
            <IonItemOptions slot="end">
              <IonItemOption color="warning">
                <IonIcon slot="icon-only" icon={pin}></IonIcon>
              </IonItemOption>
              <IonItemOption color="tertiary">
                <IonIcon slot="icon-only" icon={share}></IonIcon>
              </IonItemOption>
              <IonItemOption color="danger" expandable={true}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItem button={true}>
              <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                <img alt="" src="https://gift.me/assets/store/salvatore.png" />
              </IonAvatar>
              <div className='itemWrapper'>
              <IonLabel  style={{ fontSize: '16px'}}>Dolce & Gabanna</IonLabel>
             <p style={{marginTop:'3px'}}>Your take- everywhere tote.Elevate your casual daytime look with our roomy tote bag.</p></div>
         
            </IonItem>
            <IonItemOptions slot="end">
              <IonItemOption color="warning">
                <IonIcon slot="icon-only" icon={pin}></IonIcon>
              </IonItemOption>
              <IonItemOption color="tertiary">
                <IonIcon slot="icon-only" icon={share}></IonIcon>
              </IonItemOption>
              <IonItemOption color="danger" expandable={true}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItem button={true}>
              <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                <img alt="" src="https://gift.me/assets/store/alexander.png" />
              </IonAvatar>
              <div className='itemWrapper'>
              <IonLabel  style={{ fontSize: '16px'}}>Salvatore Ferragamo</IonLabel>
             <p style={{marginTop:'3px'}}> Your take- everywhere tote.Elevate your casual daytime look with our roomy tote bag.</p></div>
            </IonItem>
            <IonItemOptions slot="end">
              <IonItemOption color="warning">
                <IonIcon slot="icon-only" icon={pin}></IonIcon>
              </IonItemOption>
              <IonItemOption color="tertiary">
                <IonIcon slot="icon-only" icon={share}></IonIcon>
              </IonItemOption>
              <IonItemOption color="danger" expandable={true}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItem button={true}>
              <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                <img alt="" src="https://gift.me/assets/store/gucci.png" />
              </IonAvatar>
              <div className='itemWrapper'>
              <IonLabel  style={{ fontSize: '16px'}}>Alexander McQueen</IonLabel>
             <p style={{marginTop:'3px'}}>Your take- everywhere tote.Elevate your casual daytime look with our roomy tote bag.</p></div>
            </IonItem>
            <IonItemOptions slot="end">
              <IonItemOption color="warning">
                <IonIcon slot="icon-only" icon={pin}></IonIcon>
              </IonItemOption>
              <IonItemOption color="tertiary">
                <IonIcon slot="icon-only" icon={share}></IonIcon>
              </IonItemOption>
              <IonItemOption color="danger" expandable={true}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItem button={true}>
              <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                <img alt="" src="https://gift.me/assets/store/givenchy.png" />
              </IonAvatar>
              <div className='itemWrapper'>
              <IonLabel  style={{ fontSize: '16px'}}>Givenchy</IonLabel>
             <p style={{marginTop:'3px'}}>Your take everywhere tote.Elevate your casual daytime look with our roomy tote bag.</p></div>
            </IonItem>
            <IonItemOptions slot="end">
              <IonItemOption color="warning">
                <IonIcon slot="icon-only" icon={pin}></IonIcon>
              </IonItemOption>
              <IonItemOption color="tertiary">
                <IonIcon slot="icon-only" icon={share}></IonIcon>
              </IonItemOption>
              <IonItemOption color="danger" expandable={true}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItem button={true}>
              <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                <img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZF-NroSpdT4PDA6IV5VI7TTSYwAg1l3ZnDg&s" />
              </IonAvatar>
              <div className='itemWrapper'>
              <IonLabel  style={{ fontSize: '16px'}}>Caprese Wallets</IonLabel>
             <p>Your take- everywhere tote.Elevate your casual daytime look with our roomy tote bag.</p></div>
            </IonItem>
            <IonItemOptions slot="end">
              <IonItemOption color="warning">
                <IonIcon slot="icon-only" icon={pin}></IonIcon>
              </IonItemOption>
              <IonItemOption color="tertiary">
                <IonIcon slot="icon-only" icon={share}></IonIcon>
              </IonItemOption>
              <IonItemOption color="danger" expandable={true}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>

          <IonItemSliding>
            <IonItem button={true}>
              <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                <img alt="" src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTDSHUJBzpXFCGNuEVCra1hewCaIpA1G97YRAimrJzKI1X4SNcxfBC22MrFcwCXLrBGQpzxJXOgi3SoOMNZm9hcL3au8z0r_lhTav8Sxfd84pl1bhzEP70AjY9pnfBScVaHGI10Mn2K&usqp=CAc" />
              </IonAvatar>
              <div className='itemWrapper'>
              <IonLabel  style={{ fontSize: '16px'}}>Fossil Lisa Zip Around Clutch</IonLabel>
             <p>Your take- everywhere tote.Elevate your casual daytime look with our roomy tote bag.</p></div>
            </IonItem>
            <IonItemOptions slot="end">
              <IonItemOption color="warning">
                <IonIcon slot="icon-only" icon={pin}></IonIcon>
              </IonItemOption>
              <IonItemOption color="tertiary">
                <IonIcon slot="icon-only" icon={share}></IonIcon>
              </IonItemOption>
              <IonItemOption color="danger" expandable={true}>
                <IonIcon slot="icon-only" icon={trash}></IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
          </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
export default Tab2;
