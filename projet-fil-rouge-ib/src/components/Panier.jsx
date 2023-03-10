import React from 'react';
import { useEffect, useState } from 'react';
import Service from '../assets/ApiService';
import '../styles/panier.css';
import Prestations from '../models/prestations';
import CartePrestation from './CartePrestation';

const Panier = () => {
    const _service = new Service();

    const [client, setClient] = useState({})
    const [panier, setPanier] = useState([])
    const [sousTotal, setSousTotal] = useState(0)

    useEffect(() => {
        const id = localStorage.getItem('id');

        // Récupère le client actuellement connecté
        async function fetchClient(id) {
            const clientTmp = await _service.recupererUtilisateurById(id);
            setClient(clientTmp);
            setPanier(clientTmp.panier);

            // Pour récupérer le sous-total (la somme des taux horaires des prestations du panier)
            const taux = clientTmp.panier.map((prestation) => prestation.tauxHoraires);
            const total = taux.reduce((acc, taux) => acc + taux, 0);
            setSousTotal(total);
        }
        fetchClient(+id)
    }, [])

    /**
     * Crée une nouvelle prestation pour chaque prestation dans le panier, et supprime le panier du client
     */
    async function validerMaCommande() {
        panier.forEach(async (prestation) => {
            const nouvellePrestation = new Prestations(
                prestation.titre,
                prestation.description,
                prestation.tauxHoraires,
                prestation.prestataire,
                prestation.image,
                prestation.type
            )
            nouvellePrestation.client = client.nom;
            nouvellePrestation.etat = "Demande envoyée";

            await _service.creerPrestations(nouvellePrestation);
        })

        // Supprime la/les prestation(s) du panier
        await _service.supprimerPanierUtilisateur(client.id);

        alert("Votre commande a bien été prise en compte !");
        window.location.reload()
    }

    return (
        <div className="main">
            <div className="panier">
                <div className="headerPanier"><h3 className="titrePanier">Prestations Sélectionnées</h3></div>
                <div className='PrestationsPanier'>
                    {panier && (
                        panier.map((prestation) => {
                            return (
                                <CartePrestation key={prestation.id} prestation={prestation} boutonSupprimer={true} />
                            )
                        })
                    )}
                </div>
            </div>
            <div className='Total'>
                <p className='maCommande'>Ma Commande</p>
                <div className='separationMaCommande'></div>
                <p className='sousTotal'>Sous-total ({panier.length} Prestations) :<b> {sousTotal} € </b> </p>
                <button className='validerCommande' onClick={validerMaCommande}>Valider ma Commande</button>
            </div>
        </div>
    );
};

export default Panier;