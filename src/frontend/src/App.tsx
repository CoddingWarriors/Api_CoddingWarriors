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
import CadastroADM from "./pages/CadastroADM"
import EsqueciSenha from "./pages/EsqueciSenha"
import NovaSenha from "./pages/NovaSenha"
import AbrirChamado from "./pages/AbrirChamado"
import Equipamentos from "./pages/Equipamentos"
import VisualizarChamado from "./pages/VisualizarChamado"
import ResponderChamado from "./pages/ResponderChamado"
import HomeAdm from "./pages/HomeAdm"


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
                <Route path="/cadastrosuporte" element={<CadastroADM />} />
                <Route path="/esquecisenha" element={<EsqueciSenha />} />
                <Route path="/novasenha" element={<NovaSenha />} />
                <Route path="/abrirchamado" element={<AbrirChamado />} />
                {<Route path="/cadastrarequipamentos" element={<Equipamentos />} />}
                <Route path="/responderchamado/:chamadoId" element={<ResponderChamado />} />
                <Route path="/visualizarchamado/:chamadoId" element={<VisualizarChamado />} />
                <Route path="/homeadm" element={<HomeAdm />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
