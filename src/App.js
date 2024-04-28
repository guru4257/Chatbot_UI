import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Chatbot from "./components/chatbot/Chatbot";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Help from "./components/Help";
import Slider from "./components/Slider";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
      <Container>
        <Routes>
          <Route path="/" element={<Chatbot />} />
        </Routes>
      </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
