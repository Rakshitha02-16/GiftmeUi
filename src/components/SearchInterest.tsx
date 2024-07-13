import React from 'react'
import { IonInput, IonSearchbar } from '@ionic/react'


function SearchInterest(props:any) {
    
  //  const handleSearch =(event:any) =>{
  //   const value = event.detail.value.toLowerCase();
  //   props.setSearchValue(value);
  //  }
   
   
  return (
    <IonInput value={props.searchInterest} onIonChange={props.handleSearch}  placeholder='Explore More' ></IonInput>
  )
}

export default SearchInterest