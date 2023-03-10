import React from 'react';
import HeaderPrestaEtAdmin from '../components/HeaderPrestaEtAdmin';
import { useEffect, useState } from 'react';
import Service from '../assets/ApiService';
import CartePrestationsPrestataire from '../components/CartePrestationsPrestataire';
import '../styles/commandesClients.css'

const AccueilPrestataire = () => {

    const [prestataire, setPrestataire] = useState({});
    const [panier, setPanier] = useState([]);

    const _service = new Service();

    useEffect(() => {
        const id = localStorage.getItem("id");

        // Récupère le prestataire actuellement connecté
        async function fetchPrestataire(id) {
            const prestataireTmp = await _service.recupererPrestataireById(id);
            setPrestataire(prestataireTmp);
            const panierTmp = await _service.recupererPanierPrestataire(prestataireTmp)
            setPanier(panierTmp);
        }
        fetchPrestataire(+id);
    }, []);

    return (
        <>
            <HeaderPrestaEtAdmin nom={prestataire.nomSociete} arrow='arrowVisible' boutonAjouter={true} />
            <div className="mainCommandes">
                <div className="panierCommandes">
                    <div className="headerPanier headerPresta"><h3 className="titrePanier">Prestations Sélectionnées</h3></div>
                    <div className='PrestationsPanier'>
                        {panier && (
                            panier.map((prestation) => {
                                return (
                                    <CartePrestationsPrestataire key={prestation.id} prestation={prestation} />
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccueilPrestataire;