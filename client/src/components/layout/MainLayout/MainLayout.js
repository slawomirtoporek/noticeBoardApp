import { Container } from "react-bootstrap";
import Footer from "../Footer/Footer";
import MainMenu from "../MainMenu/MainMenu";

const MainLayout = ({ children }) => {
  return(
    <div>
      <Container>
        <MainMenu />
        {children}
        <Footer />
      </Container>
    </div>
  );
};

export default MainLayout;