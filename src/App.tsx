import {
  IonApp,
  IonButton,
  IonButtons,
  IonFooter,
  IonGrid,
  IonIcon,
  IonItem,
  IonToolbar,
  setupIonicReact,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonContent,
  IonHeader, 
  IonTitle,
  IonBackButton,
  IonPage
} from "@ionic/react";
import { addOutline, clipboardOutline, personOutline } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";

import { Redirect, Route } from "react-router";


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";

/* Custom Components */
import LoginPage from "./pages/loginPage";
import CantLogin from "./pages/cantLogin";
import CreateAcc from "./pages/createAcc";
import MyAccount from "./pages/myAccount";
import CreateBoard from "./pages/createBoard";
import MyBoards from "./pages/MyBoards";
import { useEffect, useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("Rendered Main APP");
    if (localStorage.getItem("token")!=null){
      setLoggedIn(true);
    }
  }, []);

  function resetBoardPage() {
    const nav = document.querySelector('ion-nav');
    nav?.popToRoot();
  }

  return (
    <IonApp>
      {loggedIn ? (
        <>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/MyBoards" >
                  <IonPage>
                    <MyBoards />
                  </IonPage>
                </Route>
                <Route exact path="/CreateBoard">
                  <IonPage>
                    <CreateBoard  />
                  </IonPage>
                </Route>
                <Route exact path="/MyAccount">
                  <IonPage>
                    <MyAccount changeLogin={(setTo:boolean)=>{setLoggedIn(setTo)}} />
                  </IonPage>
                </Route>
                <Route exact path="/">
                  <Redirect to="/MyAccount" />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton
                  disabled={false}
                  tab="MyBoards"
                  href="/MyBoards"
                  onClick={() => resetBoardPage()}
                >
                  <IonIcon icon={clipboardOutline} />
                  <IonLabel>My Boards</IonLabel>
                </IonTabButton>
                <IonTabButton
                  disabled={false}
                  tab="CreateBoard"
                  href="/CreateBoard"
                >
                  <IonIcon icon={addOutline} />
                  <IonLabel>Create new Board</IonLabel>
                </IonTabButton>
                <IonTabButton disabled={false} tab="MyAccount" href="/MyAccount">
                  <IonIcon icon={personOutline} />
                  <IonLabel>My Account</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonReactRouter>
        </>
      ) : (
        <>
          <IonReactRouter>
              <IonRouterOutlet>
                <Route exact path="/LoginPage">
                  <IonContent>
                    <LoginPage props={(setTo:boolean)=>{setLoggedIn(setTo)}}/>
                  </IonContent>
                </Route>
                <Route exact path="/CreateAcc">
                  <IonContent>
                    <CreateAcc />
                  </IonContent>
                </Route>
                <Route exact path="/CantLogin">
                  <IonContent>
                    <CantLogin changeLogin={(setTo:boolean)=>{setLoggedIn(setTo)}}/>
                  </IonContent>
                </Route>
                <Route exact path="/">
                <Redirect to="/LoginPage" />
                </Route>
              </IonRouterOutlet>
            </IonReactRouter>
        </>
      )}
    </IonApp>
  );
};

export default App;
