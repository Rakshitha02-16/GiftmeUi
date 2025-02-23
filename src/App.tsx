import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, personOutline, triangle } from 'ionicons/icons';

import Tab1 from './pages/Home';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/MyProfile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */

import './theme/variables.css';
import AddItems from "./pages/AddItems"
import PersonalDetails from './pages/PersonalDetails';
import Login from './pages/Login';
import Confirmotp from './pages/Confirmotp';
import Register from './pages/Register';
import GiftSearch from './pages/GiftSearch';
import SearchInterest from './pages/Tab2';
import Home from "./pages/Home";
import FriendsPage from "./pages/FrientdsPage"
import PersonalDetails from './pages/UserProfile';
import WishlistDetail from './pages/WishlistDetail';
import FollowGiftTracker from './pages/followgifttracker';
import FollowersList from './pages/followerslist';
import FollowingList from './pages/followinglist';
// import GiftList from './pages/giftlist';
import Giftpost from './pages/giftpost'
// import WishList from './pages/wishlist';
import ProfileSearch from './pages/ProfileSearch'
import SearchPage from './pages/SearchPage';
import GiftSearchPage from './pages/GiftSearchPage'
setupIonicReact();
import FollowRequests from './pages/FollowRequest';

const App: React.FC = () => (
  
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3" render={() => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return <Tab3 userId={user?.id || 1} />;
}} />

          <Route exact path="/edit-profile">
            <PersonalDetails />
          </Route>
          <Route path="/login" component={Login} exact />
          <Route path="/ConfirmOTP" component={Confirmotp} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/giftsearch" component={GiftSearch} exact />
          <Route path="/searchpage" component={SearchInterest} exact/>
           <Route path="/home" component={Home} exact />
          <Route path="/friends" component={FriendsPage} exact />
          <Route exact path="/add-item">
            <AddItems />
          </Route>
          {/* <Route exact path="/wishlist">
            <WishList />
          </Route> */}
          
          <Route path="/add-item/:wishlistId/:wishlistName" component={AddItems} />

          <Route path="/tracker" component={FollowGiftTracker} />
          <Route path="/followers" component={FollowersList} />
          <Route path="/following" component={FollowingList} />
          {/* <Route path="/gifts-given" render={() => <GiftList type="given" />} />
          <Route path="/gifts-taken" render={() => <GiftList type="taken" />} /> */}
          <Route path="/giftpost" component={Giftpost} />
           {/* <Route path="/wishList" component={WishList} exact={true} />  */}
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
<<<<<<< HEAD
         <Route path="/FollowRequest" component={FollowRequests} exact/>
          <Route path="/wishlist-detail/:wishlistId" component={WishlistDetail} />
          
=======
         <Route path="/wishlist-detail/:wishlistId/:wishlistName" component={WishlistDetail} />

          <Route path="/SearchPage" component={SearchPage} />
          <Route path="/GiftSearch" component={GiftSearchPage} />
          <Route path="/ProfileSearch" component={ProfileSearch} exact />

>>>>>>> 91ecd14 ( made changes in wishlist , add item and event and also profile search, gift post  completed)
        </IonRouterOutlet>

        {/* Tab Bar */}
        {/* <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={personOutline} />
            <IonLabel>My Profile</IonLabel>
          </IonTabButton>
        </IonTabBar> */}
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
