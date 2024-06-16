import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EditarPerfil.module.css";
import perfil from "../img/FotoUsuarioPerfil.png";
import  {toast,  ToastContainer } from "react-toastify";

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
    const [editUserInfo, setEditUserInfo] = useState<UserInfo>({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        cpf: "",
    });
    const [editUserAddress, setEditUserAddress] = useState<UserAddress>({
        cep: "",
        endereco: "",
        numero: "",
    });
    const [activeTab, setActiveTab] = useState("dadosPessoais");
    const navigate = useNavigate();

    const handleEditPhoto = () => {
        
        console.log("Botão Editar Foto clicado");
    };

    const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditUserInfo({ ...editUserInfo, [name]: value });
    };

    const handleChangeUserAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditUserAddress({ ...editUserAddress, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const token = localStorage.getItem("token");
    
        if (!token) {
            console.error("Token de autenticação não encontrado.");
            navigate("/login");
            return;
        }
    
        const updatedData = {
            ...editUserInfo,
            ...editUserAddress,
        };
    
        try {
            const response = await fetch("http://localhost:5000/editarperfil", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });
    
            if (response.ok) {
                console.log("Informações atualizadas com sucesso");
                alert("Dados cadastrais alterados com sucesso");
                navigate("/perfil")
            } else {
                console.error("Erro ao atualizar informações do usuário:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao atualizar informações do usuário:", error);
        }
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
                return;
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
                    setEditUserInfo({
                        nome: data.nome,
                        email: data.email,
                        cpf: data.cpf,
                        senha: data.senha,
                        telefone: data.telefone,
                    });
                    setEditUserAddress({
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
            <input className={styles.inputt} type="text" name="nome" value={editUserInfo.nome} onChange={handleChangeUserInfo} />

            <label className={styles.labell}>Email</label>
            <input className={styles.inputt} type="text" name="email" value={editUserInfo.email} onChange={handleChangeUserInfo} />

            <label className={styles.labell}>Senha</label>
            <input className={styles.inputt} type="text" name="senha" value={editUserInfo.senha} onChange={handleChangeUserInfo} />

            <label className={styles.labell}>CPF</label>
            <input className={styles.inputt} type="text" name="cpf" value={editUserInfo.cpf} onChange={handleChangeUserInfo} />

            <label className={styles.labell}>Telefone</label>
            <input className={styles.inputt} type="text" name="telefone" value={editUserInfo.telefone} onChange={handleChangeUserInfo} />
        </>
    );

    const renderAddressData = () => (
        <>
            <label className={styles.labell}>Endereço</label>
            <input className={styles.inputt} type="text" name="endereco" value={editUserAddress.endereco} onChange={handleChangeUserAddress} />

            <label className={styles.labell}>Número</label>
            <input className={styles.inputt} type="text" name="numero" value={editUserAddress.numero} onChange={handleChangeUserAddress} />

            <label className={styles.labell}>CEP</label>
            <input className={styles.inputt} type="text" name="cep" value={editUserAddress.cep} onChange={handleChangeUserAddress} />
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
                    <div className={styles.buttoncontainer}>
                        <button className={styles.alterButton} type="submit">Alterar</button>
                        <button className={styles.cancelButton} onClick={handleUndo}>Desfazer</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditarPerfil;