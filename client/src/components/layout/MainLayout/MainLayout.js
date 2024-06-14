import Footer from "../Footer/Footer";

const MainLayout = ({ children }) => {
  return(
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;