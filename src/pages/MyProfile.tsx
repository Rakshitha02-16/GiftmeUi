import { IonContent, IonHeader, IonImg, IonItem, IonLabel, IonPage, IonTitle, IonToolbar , IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton,IonIcon, IonicSlides, IonModal, IonList, IonItemSliding, IonAvatar} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {close} from 'ionicons/icons';

import { useHistory } from 'react-router';



  
import 'swiper/swiper-bundle.css'

import {powerOutline} from 'ionicons/icons';
import './Tab3.css';
import { useCallback, useRef, useState } from 'react';

import { Navigation, Pagination, Scrollbar, A11y  } from 'swiper/modules';
import { wishlistCategoryData } from './../data/wishlistCategory';
import Tab2 from './Tab2';
import WishList from '../components/WishListItem';
import AddWishList from '../components/AddWishList';

interface WishlistCategoryOject{
  id: number;
  wishlistCategoryImg:string;
  wishlistCategoryTitle: string;
}

const Tab3: React.FC = () => {
  // const [interestData,setInterestData] =useState(interests);

  const modal = useRef<HTMLIonModalElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ wishlistCategory, setWishlistCategory] = useState<WishlistCategoryOject[]>(wishlistCategoryData)
  const [wishListModal, setWishlistModal] = useState(false);

  const history = useHistory();
  const wishlist = useHistory();

  const navigateToWishList = () => {
      history.push('/wishList');
      setWishlistModal(true);
    };
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  //  const wishListOpenHandler = () =>{
  //   setWishlistModal(true);
  //  }

  const handleFormSubmit = (wishlistCategoryTitle:string, wishlistCategoryImg:string ) =>{
       const newWishListData = { id: wishlistCategory.length + 1, wishlistCategoryTitle , wishlistCategoryImg}
       setWishlistCategory([...wishlistCategory,newWishListData])
  }
  
   const wishListCloseHandler = useCallback(() => {
    
    wishlist.push('/tab3');
    // wishlist.goBack();
    setWishlistModal(false);
    modal.current?.dismiss();
    console.log('Hi');
}, [setWishlistModal, wishlist]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{display:"flex"}}>
          <IonTitle>My Profile</IonTitle>
          <IonButton style={{marginRight:"16px"}}><IonIcon slot='icon-only' icon={powerOutline}  style={{ fontSize:"26px"}}></IonIcon></IonButton></div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <IonImg src='data:image/jpeg;base64,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'  alt='User-Profile-Image' style={{width: '100px', height: '70px',marginLeft:"9.9rem",padding:"9px",marginTop:"22px",border:"1px solid black",borderRadius:"90px"}} />
       <IonItem>
         <IonLabel style={{ marginLeft:"9.0rem",fontSize:"27px"}}>Sanjana</IonLabel>
       </IonItem>
       <IonItem>
        <IonLabel style={{textAlign:"center",fontSize:"18px",padding:"4px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, excepturi minus. </IonLabel>
       </IonItem>
      
      <IonItem style={{marginTop:"60px"}}>
        <IonLabel style={{fontSize:"24px"}}>Wishlist</IonLabel>
        <IonButton onClick={handleOpenModal} >View All</IonButton>
      </IonItem>
     <IonModal isOpen={isModalOpen} onDidDismiss={handleCloseModal}>
     <IonHeader style={{padding:"14px"}}>
              <span style={{fontSize:"24px",marginLeft:"22px",position:"relative",top:"7px",fontFamily:"sans-serif"}}>View All Wishlist</span>
             <IonButton onClick={handleCloseModal} style={{position:"relative", left:"9.9em"}} >
             <IonIcon slot='icon-only' icon={close} style={{fontSize:"28px"}}></IonIcon>
              </IonButton>
          </IonHeader>
             <IonContent style={{position: "relative" ,left:"16px"}} >
             
              <IonList inset={true}  className='ionList' style={{padding:"6px",marginLeft:"20px"}} >
              {wishlistCategory.map((item,index) =>(
                
                <IonCard key={index} style={{ marginLeft: "18px", marginBottom: "12px" }} button onClick={navigateToWishList}>



                  <IonItem button={true}>
                    <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                      <img alt="wishlist image" src={item.wishlistCategoryImg} />
                    </IonAvatar>
                    <div className='itemWrapper'>
                      <IonLabel style={{ fontSize: '26px', marginLeft: "8px" }}>{item.wishlistCategoryTitle}</IonLabel>
                    </div>

                  </IonItem>



                </IonCard>
                
              ))}
              
              </IonList>
              <AddWishList onFormSubmit={handleFormSubmit} />
             </IonContent>

     </IonModal>
         <IonModal isOpen={wishListModal} onDidDismiss={wishListCloseHandler}>
           <WishList isModalOpen={wishListModal} onCloseHandler={wishListCloseHandler} />
                    
          </IonModal>
          
          
          <Swiper 
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{clickable: true}}  
        spaceBetween={3} slidesPerView={2} 
        onSlideChange={()=> console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        style={{padding:"10px",margin:"8px"}}
       >
       
             
            <SwiperSlide >
            <IonCard color="light" style={{width:"160px",textAlign:"center"}}  >
               <IonCardHeader>
                 <IonCardTitle className='title'>Birthday</IonCardTitle>
               
               </IonCardHeader>
       
               <IonCardContent>10</IonCardContent>
             </IonCard></SwiperSlide>
         
     
     

      <SwiperSlide>
      <IonCard color="light" style={{width:"160px",textAlign:"center"}}  >
     
        <IonCardHeader>
          <IonCardTitle>Anniversary</IonCardTitle>
          
        </IonCardHeader>

        <IonCardContent>6</IonCardContent>
      </IonCard></SwiperSlide> 


      <SwiperSlide>
      <IonCard color="light" style={{width:"160px",textAlign:"center"}} >
        <IonCardHeader>
          <IonCardTitle>Milestone</IonCardTitle>
          
        </IonCardHeader>

        <IonCardContent>8</IonCardContent>
      </IonCard></SwiperSlide>
      
      <SwiperSlide>
      <IonCard color="light" style={{width:"160px",textAlign:"center"}} >
        <IonCardHeader>
          <IonCardTitle>Others</IonCardTitle>
          
        </IonCardHeader>

        <IonCardContent>6</IonCardContent>
      </IonCard></SwiperSlide> 
     
      </Swiper>
      
    </IonContent>
    </IonPage>
  );
};

export default Tab3;
