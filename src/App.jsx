import "./App.css";
import { Container } from "@mui/material";
import MainContent from "./components/MainContent";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          // border: "2px solid red",
        }}
      >
        <Container>
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;
