import { IonAvatar, IonChip,  IonButton,  IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonToggle, IonToolbar, IonModal, 
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonCard,
  IonTitle,

  IonButtons, } from '@ionic/react';
import { heart, searchOutline, close} from 'ionicons/icons';
import { IonImg } from '@ionic/react';
import { IonRange, IonText } from '@ionic/react';
import  GiftmeLogo from '../Images/GiftmeLogo.png' 
import { pin, share, trash } from 'ionicons/icons';
import './Tab2.css';



import './Tab1.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import SearchInterest from '../components/SearchInterest';
import { interests } from '../data/interests';
import { GiftMeRequestData } from './../types/GiftMeData';
import { bags } from '../data/bags';





const Tab1: React.FC = () => {
   let lowerAge =0;
   let upperAge = 100;

   let lowbudget = 0;
   let upperbudget = 100000;
   
  

  const [age,setAge] = useState({ lowerAge:0, upperAge:100});
  const [budget , setBudget] = useState({ lowbudget:0 , upperbudget: 100000})

  //  const [searchInterest , setSearchInterest] = useState('');
   const [ selectedOptions , setSelectedOptions] = useState<string[]>([])
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [ bagData,setBagData] = useState(bags)

   const [appData , setAppData] = useState<GiftMeRequestData>({
    gender: false,
    age: 0,
    relationship:'',
    occasion: '',
    interests: [],
    budget: 0
   });

 

  const handleOpenModal = () => {
    console.log('Gift Me App Data =',appData)
    alert(`Gift Me App Data = ${JSON.stringify(appData,null,2)}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 

  const updateData = (field: keyof GiftMeRequestData, value: any)=> {
    setAppData((prevAppData) =>({
      ...prevAppData,
      [field]: value,
    }));
  };
 

  const ageHandleChange =(e:any) =>{
    setAge({ lowerAge:e.target.value, upperAge:e.target.value})
  }

  const budgetHandleChange =(e:any) =>{ 
    setBudget({ lowbudget:e.target.value, upperbudget: e.target.value})
  }

 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
         <IonImg
          src={GiftmeLogo} style={{width: '100px', height: '70px' , marginLeft: '150px'}} 
          alt="Gift me logo"></IonImg>
         
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonToolbar>
          <IonItem>
        <IonToggle labelPlacement="start" alignment='center' checked={appData.gender} onIonChange={(e) => updateData('gender', e.target.value)}>Female</IonToggle>
         Male</IonItem>
        {/* <IonToggle labelPlacement="start">Male</IonToggle> */}
        <IonItem>
        <IonRange label='Age' labelPlacement='start' min={0} max={100} pin={true} ticks={true} snaps={true}  onIonChange={ageHandleChange} value={appData.age}
         onIonInput={(e)=> updateData('age',e.target.value)}  >
              <IonText slot='start' color="primary"  >{lowerAge}</IonText>
              <IonText slot='end' color="primary">{upperAge}</IonText>
          
          </IonRange>
          </IonItem>
          <IonList>
            <IonItem >
              <IonSelect label='Relationship' labelPlacement='floating' placeholder='Select an Option' value={appData.relationship} onIonChange={(e) => updateData('relationship',e.target.value)}>
              <IonSelectOption value="single">Single</IonSelectOption>
             <IonSelectOption value="married">Married</IonSelectOption>
              <IonSelectOption value="other">Other</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
          <IonList>
            <IonItem > 
              <IonSelect label='Occasion' labelPlacement='floating' placeholder='Select an Option' value={appData.occasion} onIonChange={(e) => updateData('occasion',e.target.value)}>
              <IonSelectOption value="birthday">Birthday</IonSelectOption>
             <IonSelectOption value="anniversary">Anniversary</IonSelectOption>
              <IonSelectOption value="milestone">Milestone</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
          
          <IonList>
            <IonItem > 
              <IonSelect label='Interests' labelPlacement='floating' placeholder='Select an Option' multiple={true} value={appData.interests} onIonChange={(e) => updateData('interests',e.target.value)}  >
              <IonSelectOption value="bags">Bags & Wallets</IonSelectOption>
             <IonSelectOption value="clothing">Clothing</IonSelectOption>
             <IonSelectOption value="sunglasses">Sun Glasses</IonSelectOption>
              <IonSelectOption value="footwear">Footwear</IonSelectOption>
              <IonSelectOption value="accessories">Accessories</IonSelectOption>
              <IonSelectOption value="perfumes">Perfumes & Fragrances</IonSelectOption>
              <IonSelectOption value="homeDecor">Home Decor</IonSelectOption>
             
              </IonSelect>
            </IonItem>
          </IonList>
         
           <IonItem>
          <IonRange label='Budget' labelPlacement='start' min={0} max={100000}  pin={true} onIonChange={budgetHandleChange}  value={appData.budget} onIonInput={(e) => updateData('budget',e.target.value)}>
              <IonText slot='start' color="primary" >${lowbudget}</IonText>
              <IonText slot='end' color="primary" >${upperbudget}</IonText>
          
          </IonRange></IonItem>
          <div style={{marginTop:"22px"}}>
          <IonButton shape='round' expand="full" onClick={handleOpenModal}>
              <IonIcon slot="icon-only" icon={searchOutline} ></IonIcon>Search
              </IonButton></div>
              <IonModal isOpen={isModalOpen}  onDidDismiss={handleCloseModal}>
             
             <IonHeader style={{padding:"14px"}}>
              <span style={{fontSize:"22px",marginLeft:"16px",position:"relative",top:"7px",fontFamily:"sans-serif"}}>Recommendations</span>
             <IonButton onClick={handleCloseModal} style={{position:"relative", left:"8.9em", }} >
             <IonIcon slot='icon-only' icon={close} style={{fontSize:"28px"}}></IonIcon>
              </IonButton>
             </IonHeader>
              <IonContent style={{position: "relative" , left:"20px"}}>
          {/* <IonLabel>{appData.gender}</IonLabel> */}
          <IonList inset={true}  className='ionList'>
            {bagData.map((item,index)=> (
              <IonCard style={{ height:"160px",margin:"12px",padding:"13px",width:"360px", zIndex:"1000"}}>
          <IonItemSliding key={index}>
            <IonItem button={true} >
              <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                <img alt="" src={item.bagImg} />
              </IonAvatar>
              <div className='itemWrapper'>
              <IonLabel style={{ fontSize: '16px',marginTop:"12px"}}>{item.bagTitle}</IonLabel>
             <p style={{marginTop:'10px'}}>{item.bagDesc}</p></div>
             <div className='priceWrapper'>₹{item.bagPrice.toFixed(1)}</div>
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
           
          </IonItemSliding></IonCard>
           ))}
          
          </IonList>
          </IonContent> </IonModal>


          
        </IonToolbar>
      </IonContent> 
      
    </IonPage>
  );
};

export default Tab1;                                                              














