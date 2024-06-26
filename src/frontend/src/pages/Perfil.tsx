import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Perfil.module.css";
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
    rua: string;
    numero: string;
    complemento: string;
    cidade: string;
    estado: string;
}

const Perfil: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
    const [activeTab, setActiveTab] = useState("dadosPessoais");
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEditClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalConfirm = () => {
        if (password === userInfo?.senha) {
            setShowModal(false);
            navigate('/editarperfil');
        } else {
            console.error("Senha incorreta");
        }
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
                        senha: data.senha,  // Armazene a senha para comparação
                        telefone: data.telefone,
                    });
                    setUserAddress({
                        rua: data.rua,
                        cep: data.cep,
                        numero: data.numero,
                        complemento: data.complemento,
                        cidade: data.cidade,
                        estado: data.estado,
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

            <label className={styles.labell}>CPF</label>
            <input className={styles.inputt} type="text" value={userInfo?.cpf || "Carregando..."} readOnly />

            <label className={styles.labell}>Telefone</label>
            <input className={styles.inputt} type="text" value={userInfo?.telefone || "Carregando..."} readOnly />
        </>
    );

    const renderAddressData = () => (
        <>
            <label className={styles.labell}>Rua</label>
            <input className={styles.inputt} type="text" value={userAddress?.rua || "Carregando..."} readOnly />

            <label className={styles.labell}>Número</label>
            <input className={styles.inputt} type="text" value={userAddress?.numero || "Carregando..."} readOnly />

            <label className={styles.labell}>Complemento</label>
            <input className={styles.inputt} type="text" value={userAddress?.complemento || "N/A"} readOnly />

            <label className={styles.labell}>Cidade</label>
            <input className={styles.inputt} type="text" value={userAddress?.cidade || "Carregando..."} readOnly />

            <label className={styles.labell}>Estado</label>
            <input className={styles.inputt} type="text" value={userAddress?.estado || "Carregando..."} readOnly />

            <label className={styles.labell}>CEP</label>
            <input className={styles.inputt} type="text" value={userAddress?.cep || "Carregando..."} readOnly />
        </>
    );

    return (
        <div className={styles.perfil}>
            <div className={styles.fotoperfil}>
                <input
                    className={styles.file}
                    type="file"
                    id="imagem"
                    style={{ display: 'none' }}
                />
                <img className={styles.foto} src={perfil} alt="Foto de perfil" />
            </div>
            <div className={styles.formulario}>
                <div className={styles.tabContainer}>
                    <button className={`${styles.tabButton} ${activeTab === "dadosPessoais" ? styles.active : ""}`} onClick={() => setActiveTab("dadosPessoais")}>Dados pessoais</button>
                    <button className={`${styles.tabButton} ${activeTab === "endereco" ? styles.active : ""}`} onClick={() => setActiveTab("endereco")}>Endereço</button>
                </div>
                <form className={styles.formi}>
                    {activeTab === "dadosPessoais" ? renderPersonalData() : renderAddressData()}
                </form>
                <div className={styles.buttoncontainer}>
                    <button className={styles.editButton} onClick={handleEditClick}>Editar</button>
                </div>
            </div>
            {showModal && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <span className={styles.close} onClick={handleModalClose}>&times;</span>
                            <p>Por favor, insira sua senha para verificação</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.modalInput}
                            />
                            <button className={styles.modalButton} onClick={handleModalConfirm}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Perfil;
