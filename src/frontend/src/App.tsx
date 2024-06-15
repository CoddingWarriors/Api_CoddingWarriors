import React from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Atendimento from "./pages/Atendimento"
import AtendimentoSuporte from "./pages/VisualizaChamdSuporte"
import Faq from "./pages/Faq"
import VisualizarFaq from "./pages/VisualizarFaq"
import EditarFaq from "./pages/EditarFaq"
import CadastrarFaq from "./pages/CadastrarFaq"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Perfil from "./pages/Perfil"
import EditarPerfil from "./pages/EditarPerfil"
import Cadastro from "./pages/Cadastro"
import CadastroADM from "./pages/CadastroADM"
import EsqueciSenha from "./pages/EsqueciSenha"
import NovaSenha from "./pages/NovaSenha"
import AbrirChamado from "./pages/AbrirChamado"
import CadastroEquipamentos from "./pages/CadastroEquipamentos"
import VisualizarEquipamento from "./pages/VisualizarEquipamento"
import VisualizarChamado from "./pages/VisualizarChamado"
import ResponderChamado from "./pages/ResponderChamado"
import EditarEquipamento from "./pages/EditarEquipamento";
import Dashboard from "./pages/Dashboard"


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/atendimento" element={<Atendimento />} />
                <Route path="/chamados" element={<AtendimentoSuporte />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/visualizarfaq" element={<VisualizarFaq />} />
                <Route path="/editarfaq" element={<EditarFaq />} />
                <Route path="/cadastrarfaq" element={<CadastrarFaq />} />
                <Route path="/login" element={<Login />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/editarperfil" element={<EditarPerfil />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/cadastrosuporte" element={<CadastroADM />} />
                <Route path="/esquecisenha" element={<EsqueciSenha />} />
                <Route path="/novasenha" element={<NovaSenha />} />
                <Route path="/abrirchamado" element={<AbrirChamado />} />
                <Route path="/cadastrarequipamentos" element={<CadastroEquipamentos />} />
                <Route path="/visualizarequipamento" element={<VisualizarEquipamento />} />
                <Route path="/responderchamado/:chamadoId" element={<ResponderChamado />} />
                <Route path="/visualizarchamado/:chamadoId" element={<VisualizarChamado />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/editar-equipamento/:equipamentoId" element={<EditarEquipamento />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App
