import HomeComponent from "../components/HomeComponent";
import Note from "../components/utilityComponents/Note";
import Footer from "../components/utilityComponents/Footer";
import Chatbot from "../components/utilityComponents/Chatbot";
function HomePage() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <>
     {currentUser && <Note />}
      <div className="content">
      <HomeComponent/>
      </div>
      <div className="footer">
        <Footer />
      </div>
      <Chatbot />
    </>
  );
}

export default HomePage;
