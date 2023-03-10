import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AccueilClient from '../pages/AccueilClient';
import HomePage from '../pages/HomePage';
import Inscription from '../pages/Inscription';
import InscriptionSuite from '../pages/InscriptionSuite';
import AjoutPrestations from '../pages/AjoutPrestations';
import PanierClient from '../pages/PanierClient';
import AccueilPrestataire from '../pages/AccueilPrestataire';
import CreationDuDevis from '../pages/CreationDuDevis';
import AffichageDuDevis from '../pages/AffichageDuDevis';
import NoterLaPrestation from '../pages/NoterLaPrestation';
import AccueilAdmin from '../pages/AccueilAdmin';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/inscription' element={<Inscription />} />
                <Route path='/inscriptionSuite' element={<InscriptionSuite />} />
                <Route path='/ajoutPrestation' element={<AjoutPrestations />} />
                <Route path='/client' element={<AccueilClient />} />
                <Route path='/affichageDevis' element={<AffichageDuDevis />} />
                <Route path='/noterPrestation' element={<NoterLaPrestation />} />
                <Route path='/panierClient' element={<PanierClient />} />
                <Route path='/prestataire' element={<AccueilPrestataire />} />
                <Route path='/creationDevis' element={<CreationDuDevis />} />
                <Route path='/admin' element={<AccueilAdmin />} />
                <Route path='/*' element='erreur 404' />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;