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

  //  const handleSelectionChange = (event: any) => {
  //   setSelectedOptions(event.detail.value);
  // };

  const handleOpenModal = () => {
    console.log('Gift Me App Data =',appData)
    alert(`Gift Me App Data = ${JSON.stringify(appData,null,2)}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const handleSubmit =() =>{
  //   console.log('Gift Me App Data =',appData)
  //   alert(`Gift Me App Data = ${JSON.stringify(appData,null,2)}`);
  // }

  const updateData = (field: keyof GiftMeRequestData, value: any)=> {
    setAppData((prevAppData) =>({
      ...prevAppData,
      [field]: value,
    }));
  };
  //  const handleSearchInput = ((e: any) =>{
  //   setSearchInterest(e.target.value);
  //   console.log(searchInterest);
  //  })
  //  const [filterItems, setFilterItems] = useState(interests)
  // console.log(searchInterest)


  // const handleSearch =(event:any) =>{
  //   const value = event.detail.value.toLowerCase();
  //   setSearchInterest(value);
  // }
  // const filteredHandleChange = useCallback((event: any) => 
  //   {
     
  //     //do filter
  //   const filteredVal = interests.filter((item) => item.specificInterest.toLowerCase().includes(event.detail.value.toLowerCase()));
  //     setFilterItems(filteredVal)
  //   }, [filterItems])

  

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
          {/* <IonItem style={{padding:'4px'}}>Interest  < SearchInterest searchValue={searchInterest}  setSearchValue={setSearchInterest} handleSearch={handleSearch} /> </IonItem>
           <IonList>
            {filterItems.map((item) =>(
              <IonItem key={item.id}>
                {item.specificInterest}
              </IonItem>
            ))}
           </IonList>
         
          <IonItem>
          */}
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
          {/* <IonItemSliding>
            <IonItem button={true}>
              <IonAvatar aria-hidden="true" slot="start" className='ionAvatar'>
                <img alt="" src="https://gift.me/assets/store/dolce_and_gabanna.png" />
              </IonAvatar>
              <div className='itemWrapper'>
              <IonLabel  style={{ fontSize: '16px'}}>Gucci</IonLabel>
             <p style={{marginTop:'3px'}}>Your take- everywhere tote.Elevate your casual daytime look with our roomy tote bag.</p></div>
             <div className='priceWrapper'>₹2000.0    - ₹5000.0</div>
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
             <div className='priceWrapper'>₹2000.0    - ₹5000.0</div>
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
             <div className='priceWrapper'>₹2000.0    - ₹5000.0</div>
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
             <div className='priceWrapper'>₹2000.0    - ₹5000.0</div>
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
             <div className='priceWrapper'>₹2000.0    - ₹5000.0</div>
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
             <div className='priceWrapper'>₹2000.0    - ₹5000.0</div>
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
             <div className='priceWrapper'>₹2000.0    - ₹5000.0</div>
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
          </IonItemSliding> */}
          </IonList>
          </IonContent> </IonModal>


          {/* </IonItem> */}
          {/* <IonToolbar>
        <IonSearchbar placeholder='Gifts coming up!'></IonSearchbar>
      </IonToolbar> */}
          
        {/* </IonToolbar>
        <IonToolbar>
          <IonItem style={{marginTop:"10px"}}>
            Recommendations 
           
            
          </IonItem>
          <IonChip color="secondary">New Arrivals!</IonChip>
          <IonChip color="success">Watches</IonChip>
          <IonChip color="warning">Perfumes</IonChip>
          <IonItem>
          <IonAvatar slot="start">
          <img alt="Silhouette of a person's head" src="data:image/jpeg;base64,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" />
        </IonAvatar>
        <IonLabel slot='start'>Watches</IonLabel>
        <IonAvatar slot="start">
          <img alt="Silhouette of a person's head" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAxgMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYBBAcDAgj/xABAEAABAwMCAwQHBQUHBQAAAAABAAIDBAURBiESMUETUWFxBxQiMkKBkRUjUmKhM3KxwfBTgpKissLhFyQlNNH/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQMEAgUG/8QAJREAAgIBBAICAgMAAAAAAAAAAAECAxEEEiExIkETUTJhUoGR/9oADAMBAAIRAxEAPwDuKIiAIiIAiIgCIvlAfSLHVEBlERAEREARYRAZReVRUQ0sD56maOGFgy+SRwa1o7yTyUG7V9vfn1OC4Vrej6ekfwO/de4Brh4glRklJvosKKtHV0LSTLaLzG0dfVg/9GOJ/Rbtq1LaLrMaekrW+sgZNNM10UwHeY3gOx44TKDi12iYRYHJZUkBERAEREAREQBERAEXySMqkXvXnZVslNaKeKdsRLX1ErzwFw5hrRucHrkeGVDaXZ3XXKx4gssvGR3ql601TNQTm12t3DVcAdNPjIhB5D948/AbnmM+do12ZJ2xXWlbE1xx28BJa0/mad8eIJ8lS6yc1ddU1Ljl08rpOLOeZ5fQAeQCrnYkuDbptFN24sWMHjL2s8na1FXWSyk5Mj6p+flg7fLCmLFquusk8La2plqra57WSdu7ifACccQcdyB1zlRC0b81zrNWsaMvfC5rW95OwH1IVUZyyj1L9NU6nxjB35vVfS+I88IycnC8blVMoaCpq5ASynhfK4DmQ0En+C1HzZE3zUEtDWGlobdJWzMjEkzu1bEyJpO2XHck4OwBW5Y7o27URm7CSnlY8skhkIJY4eI2I5HKpluoftC0m71dbK6tqH4nDZC3hcNuBo6Bu4Hl4rWkfJp2rpbjbC5xkqooKiCSY8M7ZHCMZznDg5zTnuGEB0uWRsUbpHnDWjJz3KDnvNXICKaljjB5OnkOR5taP9yi3x3e83AUl5q4aKl940tG4njx0dJsT34AHL5KPt1zm9XfDL95NBLJC+Q/HwuwCfEjBVdjaWUaNPXGyW32SUtKamUVFxl9akYeJgk9yM/lbyz4ndZkrYWndxefDfCjpaiSX33HHc3ZeY5bLO5Nnqw08Ykl9oRZ9x/0C8quO33NjY6qMHByxx9l7D3tcN2nxBWkijLO5UwaJvT9zqaOvZZrnO6cStLqOqeMOeBzY/oXDmD1HkVaxyXMLnXerNtznE9o2404hdjcF0gaR5EOcunrVB5ieNqKvjswERF2UBERAEREAWCsrBQGvXNkdRziL9oYnBnnjZcPoseqRAghwbwuB5hw2dnxzld4Iyuf6w0dU+uS3WwNa98m9TQnbtT+KM8g7vB2dty612RyuDbodRGmb3eyndeSAADA5DkvOOZr5HxEPjnjOHwyN4XsPi0r05c1maaPoIyjJZjygeS97TROumorXQD3e3bUTEfgjId9C7hHzWu5wY0ue5rWgZJJ5K7ei+0yimqL7VMLX1wApWOG7Kce6SOhcfa8iF3XHLMevuVdePbL41fEzGSxujlAcx7S1zT1B5r6Gyptx1bV1NfUUdihpA2mkdFLVVchPtt5hkbd3YOxJcNwea1HzxFzQSaa4bPTUdRcmxgytdBwl7WknHaOkc0Z6bE5xnZbFmsk2ontqruRTU1NLmKjgmJkEgGzpHjA2zkNGR1yemaa+x0FFWsvUr3XGpf7UzaZzYnjkOEjIAx0Jzuoenula68yTWaufRUb4f8AuJp4AWSSAjh4Q/BPs8WcY5DdATV9tNTp2kmusdc+rt1Ox0lTT1IBkawD3o3Abkfhdz7x15voHU7LleL0KmVkEc8onp45HAYzsQPkGrolj1lHcr2zTF5mt1e+rgfwS0gIDiBlzJIyTjLckEE8jsFH3n0H6bre0fbp6u3yOyWhjg+MHxad8eAIUNZWCyqx1z3I2v5rKoFfade6BcRwfbFs+F7QZAB4j3mn6heEHpWphltbaJ4pBsRHMHb+RAws7qa6PVr11Ul5cHRUc5rQ4uIAaMknkFzeb0qGZ4itllklkd7vaS5J/utGf1WxR6d9IGvOEVYNrtbzlxkaWAj933nHzRVSfYnr60vHknNPVB1pr2kioR2lnsz/AFiebHsyyj3AO/B3Hl5LtY5KC0jpe3aTs8dutrXcI9qSR/vSv6uP9bKdWhLCweTObnLcwiIpOAiIgCIiAIiwgCwRndfE0jYmOke8NY0EuLuQCqU3pAoWTFsNFVzRA47VvCAR3gEg4UOSXZ3Cuc/xWSavmm7TfYw25UjXvaMNmaSyRnk4bhUuv9Hl0pnE2e6xVUPSGvZwvHlIzn82/NX+13GnutEyro5OOJ5I3GCCDggjoVuYRpMmFtlT8Xg5dZ9B3O41rRqOCKlt8ZDn08UwlNS7oCQBhnf1PLlz6g1jWgBowAMADos4CyiSXQstlY8yZghUrTunrbXxXRtwpGTObc6rBdzAdI53+5XUqF08OCsvcf4a8uHzjYf5qSsqldpu2Q1c0QpyA13SRwyPkV8R2W2RuDxQwl4+J7eI/UqdvQxcpvHB/RaKkg5pY4WQen2nbG0Na6R7uEbAEwu5L9CYX59tfF/1+pOIY9t2PLsXL9BqCTHCFoVNktVW7iqbdSynvfC0qQRAadNarfSY9WoqeIjqyIBbeAsogCIiAIiIAiIgCIiAweWVW9Y6iksjIIqSJj6qcOIdICWMaOpAIJO42yPNWUqvav099uU0T6eTs6ynJMXF7jwcZa7zwN+hHdkGJZxwWVbN639FNuGrK65WmeirY4g6Ut+8pwWgtByWkEnnyUD1557l91sE9vqewuED6aU7Bsnx/unk75FfMcU080NPTN46iZ/BG3vPj4Dc/IrK3Jvk+iq+CqDlDov3oxje2y1krjlk1c90fk1jGH/MxyuSj7Pb47VbKahhyWwxhvEebj1PmSpBaksI+ctnvm5fYWEPJVq76gIMsNuljY2E8M9a8ZZGeRa0fE7pjkD38kbwcxWXhE9VVUNMwPqJWRtPLiPPy71DW240TLtXR9uxjql7Xx8R4S88IG2fJQtLSyTntqh0w4ubpX5ml8Xu+EflbgD9Ft1FFSVVOYKmmhmh/s3sBH/Cq+Xk0rSvHZ9XaVs1wlcw5bnAK01F3Ox2+jdTGCa5QCaobFwxXGcNHEDybxYG+OS2hpe2F2aiS41P5ai4TOafNvFg/MLr5UcrTTKdTQOb6bqStEbjTU0HFUStGWxZjeBxHzIXbKWsp6vJp5mSY5hp3HmFWaWlp6SHsKSCKCMfAxoaPotWpt5a4T0bnMe0+415afNrubT4e6eRG+VHy8nb0rx3yXhZVUs+pHN4Ibo/iYX9kKosDC1/4JWjZrvEeyfDKtI5qxNMytNPDPpERSQEREAREQBERAEREAWFlEBr1lJT1sDqesp4p4XjDo5WBzSPEFR1t01aLVWPq7fQsinezgDuJzgxvc0E4YDtkNxnAzyCmEQlNrgDkiytK8XGC02uruFUcQ00TpH+QHJCCE1JdJJaxtkoJuzlcwSVczTvDEeQHc52+O4ZPcoa1ww1rYaiKNrLdDtQRNGGub0k+fw+BzzKjqGmqXUEUFa4/aV8ldU17uRDMZLPIN4Yx/yrTHHyjjZjk0ADl3Kibb6N1MNqyzYt8UUs+Ji3AHI9VJTUVKWEmMNHeCvllrh4AHl5djcgrUraR9M0ESl0ZOMEqUtq6OHJWT8ZFP1ZPw3PTtMCcT3FvL8ntfyVjVW1E7j1npWHmGy1EvliJytKrl0aYflIIiLgsIy60oaX10MQkd2fBUxEbVEW/snxGSQfMdVu6VuxpamKz1dS6eGeMy22pecl8e2YnHq5udj1b3kEr1Lg0cROw3z3Kk2ky3G13ChpzitoJhWW55ySwOy5ny4hI3b4ThW1ywZ7qtyyjr+R0QKM03dor5Y6O5wjhE8YLmZ9x42c0+IcCPkpMLQeeZREQBERAEREAREQBERAEREAVK9JE4mZZrK0n/yFc3tADv2cftu+RIaD+8rqud6leaj0pWqnO7KS1SzeRe/h/wBiiTwjuCzJIhb/AHGpbqWqippzE2Cmjjy0DILsvdjuyOD6LXscQmv1A6aWeV3btOZZ3vwQc9SvK9MMeq7vxZ+87CUeXZBv8WFfEEz6eeOeI4fG4Pb5hZW+T36aoyp/fJ2zO6pms9SyW64xUkNJ6zE2PilDJOF4J5YB2O2eazBr2lMIM1JM2QDkzBaT5qlXOsfX3Cerl2dK7OM8h0H0VsrFjgwaTRTdnmsYNiK8UV69IFodTSOb2NBPxMlYYy15LQBg8zz5K8f1hcbrqeGq1NTR1cTJY3UkmGvGRnib+qnKaouFHgUVzqmMB/Zyu7VuO72sn9VW8cF8KJ5lt5wzpHXmMd6ZAGcjAGVQ/t6/E49cpsd/q2/+paNW6puG1zrJqpn9k4hsfzaNj88rnCO1Ra+0Tt/v7KyN9Fa5OONx4Z6ke6e9rD1PeRyWppR/Z6l4RkCWifkD8r2Y/wBR+qjgMYDQAAMAKQ0oOPU4wd4qF7jj8z2gf6SpRZbUq6f8LT6PJvVLrqSxO2ZT1jaqnb0EczQ4geAdxfVXgLnNsk9W9LAaBhtZZva8SyR38iF0YLVHo8GxYk0ZREUnAREQBERAEREAREQBERAFzfURMHpcoXu2bU2YxtPe5kjyR/mC6QuZemNrrZNp/U7Gvc221ZjnDekUmASfIgY81EllHUHiSZH61pjBd6K4AexURGlkJ6OBLmfXL9/JRXTZXi6UVNfrO6ASAxVDA+KZu/CebXj5qgxOmjmko6+MQ11P7MrOju57e9p5hZWj39LYs7H/AEe38e9ERcG7JDX4ilrLdcXfs4ZuzlPcx4xn6qZ/rZeVXTRVdLJTTjMcreEjvWnbnzUwbQ1eS5nsxSnlIP8A6u85iUrwsf0yRwMYwERFyXBTegoC+S53Jw9mSRtNCe9seeI/43OH91V6Xt5poqGhAdWVJLYhz4R8Tz4N/Xkuh2+jp7VbYaWE8MFPHhzifq4+J3KlcIw6uxN7foi6Amf0u0zWgYpbO4v35F7zsfoD810gLl3olP21qPU+p8HsZZm0lMT1YwD+XD9V1EclrjwjwbHmTZlERScBERAEREAREQBERAEREAUZqG0099s1Xa6sfdVMZYT+E9D8lJogODaJ1DUaVu0ujNUu7F1O/gpKh/u4JyBk/Ceh+SvV+sNPeY2F5MFTGPuqlnvR+HiD3Lc9IegqPWdAOMtp7jE3FPU4zj8ru9v8Fy+h1TqLQFS2z6yoZp6NvsxVLPacB+Vx2ePA4KqnD2jVTdt4kb9bT3K0u4bvSkRA4bWUwL4neYHtMPfkfNYiminaHwyMkad8scCFeLLqG0XuBslsroZwR7TS7Dx4Fp3XzW6Zs1YS+agja885Isxu+rcFUtHp1auUf2UxCAeYBVin0XQv/Y19ygHQMmDsf4gV5R6Fp2v4pbzdpWfgdJG0fowFRtLnq1/EgXOawZeQ0d5OF40j6q6ydjY6V1U7PtTu9mCMd5f18hlXKl0dYoHcT6L1l+eIGpe6Ug+AcSAt65Xa1WOkEldVU9JC3k0kD5Bo5/JSkvRVZqpNY6NbT1ggs0b5HSGorph99UOGM/laOjR3fXJVR9IGpKi5VzNH6YJnuFW4MqJWnaMHm3PlzPQePLUuetr1q+qNm0JQT8D9pKt4wQDtnuYPE7roPo29HlJo6ndU1DxV3iYffVONmA/CzPTvPM/QC6EPbPLtv42xLBpCwU+mdPUlppd2wM9t+Pfed3O+ZypoLA67YWVaZQiIgCIiAIiIAiIgCIiAIiIAiIgMHkqz6RaOCs0XeY6iMPDaVz25Ay0gZyO7kiID8kNe6JzJI3uY8bhzTghTlBrTUlvYG0t4qgwfC53EP1WERo6i2iTb6UNVtGPXmHxMLSsSek/Vbx/77W/uxNCIudsfon5J/ZH1ettS1jS2e8VXCfha7hH6KDnqJqiQyVEr5X/ie4uP1KIpSRDbaP0r6BIo2aCje1oD3VMvE7G5w5dHWUUnIREQBERAEREAREQH/9k=" />
        </IonAvatar>
        <IonLabel slot='start'>Perfumes</IonLabel>
        
      </IonItem>
         <IonItem>
         <IonAvatar slot="start">
          <img alt="Silhouette of a person's head" src="data:image/jpeg;base64,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" />
        </IonAvatar>
        <IonLabel slot='start'>Handbags</IonLabel>
        <IonAvatar slot="start">
          <img alt="Silhouette of a person's head" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlWN2lWWvKk9mjHQ8UJxp7_f8iqztcpnLHaA&s" />
        </IonAvatar>
        <IonLabel slot='start'>Sunglasses</IonLabel>
         </IonItem>*/}
        </IonToolbar>
      </IonContent> 
      
    </IonPage>
  );
};

export default Tab1;                                                              














