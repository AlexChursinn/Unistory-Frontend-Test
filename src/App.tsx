import React, { ReactElement } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Metaverse from "./components/Metaverse/Metaverse";
import PersonalData from "./components/PersonalData/PersonalData";
import "./App.css";
import RegistrationContextProvider from "./context/context";

/* Определил HOC withRouter функцию-обертку для компонента, которая добавляет объект router в props компонента */
function withRouter(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  function ComponentWithRouterProp(props: any): ReactElement {
    let location = useLocation(); // получаем объект location с помощью хука useLocation из react-router-dom
    let navigate = useNavigate(); // получаем функцию navigate для перенаправления с помощью хука useNavigate из react-router-dom
    let params = useParams(); // возвращаем компонент с объектом router в props
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

// Передаю PersonalData в HOC withRouter
/* const PersonalDataWithRouter = withRouter(PersonalData); */

function App(): ReactElement {
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <RegistrationContextProvider>
          <Routes>
            <Route path="/" element={<Metaverse to="/main" />} />
            <Route path="/personal/:id" element={<PersonalData />} />
          </Routes>
        </RegistrationContextProvider>
      </div>
    </div>
  );
}

export default withRouter(App);
