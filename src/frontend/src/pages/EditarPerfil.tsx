import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EditarPerfil.module.css";
import perfil from "../img/FotoUsuarioPerfil.png";

interface UserInfo {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    cpf: string;
}

interface UserAddress {
    cep: string;
    endereco: string;
    numero: string;
}

const EditarPerfil: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
    const [activeTab, setActiveTab] = useState("dadosPessoais");
    const navigate = useNavigate();

    const handleEditPhoto = () => {
        // Aqui você pode adicionar a chamada para o backend para editar a foto
        console.log("Botão Editar Foto clicado");
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Aqui você pode adicionar a chamada para o backend para alterar os dados do cliente
        console.log("Botão Alterar clicado");
    };

    const handleUndo = () => {
        navigate('/perfil');
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("Token de autenticação não encontrado.");
                navigate("/login");
            }

            try {
                const response = await fetch("http://localhost:5000/user-info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo({
                        nome: data.nome,
                        email: data.email,
                        cpf: data.cpf,
                        senha: data.senha,
                        telefone: data.telefone,
                    });
                    setUserAddress({
                        endereco: data.endereco,
                        cep: data.cep,
                        numero: data.numero,
                    });
                } else if (response.status === 401) {
                    console.error("Não autorizado - Token inválido ou expirado.");
                } else {
                    console.error("Erro ao buscar informações do usuário:", response.statusText);
                }
            } catch (error) {
                console.error("Erro ao buscar informações do usuário:", error);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    const renderPersonalData = () => (
        <>
            <label className={styles.labell}>Nome</label>
            <input className={styles.inputt} type="text" value={userInfo?.nome || "Carregando..."} readOnly />

            <label className={styles.labell}>Email</label>
            <input className={styles.inputt} type="text" value={userInfo?.email || "Carregando..."} readOnly />

            <label className={styles.labell}>Senha</label>
            <input className={styles.inputt} type="text" value={userInfo?.senha || "Carregando..."} readOnly />

            <label className={styles.labell}>CPF</label>
            <input className={styles.inputt} type="text" value={userInfo?.cpf || "Carregando..."} readOnly />

            <label className={styles.labell}>Telefone</label>
            <input className={styles.inputt} type="text" value={userInfo?.telefone || "Carregando..."} readOnly />
        </>
    );

    const renderAddressData = () => (
        <>
            <label className={styles.labell}>Endereço</label>
            <input className={styles.inputt} type="text" value={userAddress?.endereco || "Carregando..."} readOnly />

            <label className={styles.labell}>Número</label>
            <input className={styles.inputt} type="text" value={userAddress?.numero || "Carregando..."} readOnly />

            <label className={styles.labell}>CEP</label>
            <input className={styles.inputt} type="text" value={userAddress?.cep || "Carregando..."} readOnly />
        </>
    );

    return (
            <div className={styles.perfil}>
                <div className={styles.fotoperfil}>
                    <img className={styles.foto} src={perfil} alt="Foto de perfil" />
                    <button className={styles.editButton} onClick={handleEditPhoto}>Editar foto</button>
                </div>
                <div className={styles.formulario}>
                    <div className={styles.tabContainer}>
                        <button className={`${styles.tabButton} ${activeTab === "dadosPessoais" ? styles.active : ""}`} onClick={() => setActiveTab("dadosPessoais")}>Dados pessoais</button>
                        <button className={`${styles.tabButton} ${activeTab === "endereco" ? styles.active : ""}`} onClick={() => setActiveTab("endereco")}>Endereço</button>
                    </div>
                    <form className={styles.formi} onSubmit={handleSubmit}>
                        {activeTab === "dadosPessoais" ? renderPersonalData() : renderAddressData()}
                    </form>
                    <div className={styles.buttoncontainer}>
                        <button className={styles.alterButton} type="submit">Alterar</button>
                        <button className={styles.cancelButton} onClick={handleUndo}>Desfazer</button>
                    </div>
                </div>
            </div>
    );
};

export default EditarPerfil;
