import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Atendimento from "./pages/Atendimento"
import AtendimentoSuporte from "./pages/VisualizaChamdSuporte"
import Faq from "./pages/Faq"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import EsqueciSenha from "./pages/EsqueciSenha"
import NovaSenha from "./pages/NovaSenha"
import AbrirChamado from "./pages/AbrirChamado"


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/atendimento" element={<Atendimento />} />
                <Route path="/chamados" element={<AtendimentoSuporte />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/esquecisenha" element={<EsqueciSenha />} />
                <Route path="/novasenha" element={<NovaSenha />} />
                <Route path="/abrirchamado" element={<AbrirChamado />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
