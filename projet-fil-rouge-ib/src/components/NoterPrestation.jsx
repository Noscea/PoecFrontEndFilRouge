import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/noterPrestation.css'
import Service from '../assets/ApiService';

import SearchbarPrestation from './SearchbarPrestation';

const NoterPrestation = ({ prestation }) => {

    const [qualiteGlobale, setQualiteGlobale] = useState(0);
    const [communication, setCommunication] = useState(0);
    const [dossierTechnique, setDossierTechnique] = useState(0);
    const [expertise, setExpertise] = useState(0);
    const [noteMoyenne, setNoteMoyenne] = useState(0);

    const _navigate = useNavigate();
    const _service = new Service();

    const [prestationNotee, setPrestationNotee] = useState(prestation)

    const noteQualiteGlobale = (e) => {
        setQualiteGlobale(e.target.value);
    };

    const noteCommunication = (e) => {
        setCommunication(e.target.value);
    };

    const noteDossierTechnique = (e) => {
        setDossierTechnique(e.target.value);
    };

    const noteExpertise = (e) => {
        setExpertise(e.target.value);
    };

    function retourNotation() {
        _navigate(-1);
    };

    function validerNotations() {
        if (qualiteGlobale === 0 || communication === 0 || dossierTechnique === 0 || expertise === 0) {
            alert('Erreur, veuillez noter toutes les catégories');
        }
        else {
            const moyenne = (qualiteGlobale + communication + dossierTechnique + expertise) / 4;
            setNoteMoyenne(moyenne);

            prestationNotee.noteQualiteGlobale = qualiteGlobale;
            prestationNotee.noteCommunication = communication;
            prestationNotee.noteDossierTechnique = dossierTechnique;
            prestationNotee.noteExpertise = expertise;
            prestationNotee.noteMoyenne = noteMoyenne;
            prestationNotee.etat = 'Archivée';

            _service.noterPrestation(prestationNotee);

        }
    };

    return (
        <>
            <SearchbarPrestation />
            <div className='noterPrestation'>
                <h1 className='titreEvaluerPrestation'>EVALUER CETTE PRESTATION</h1>
                <div className='divQualiteGlobale'>
                    <label className='labelNotation' htmlFor="qualiteGlobale">1. La qualité globale de la prestation</label>
                    <input className='inputNotation' type="radio" name="qualiteGlobale" value='1' onChange={noteQualiteGlobale} />
                    <input className='inputNotation' type="radio" name="qualiteGlobale" value='2' onChange={noteQualiteGlobale} />
                    <input className='inputNotation' type="radio" name="qualiteGlobale" value='3' onChange={noteQualiteGlobale} />
                    <input className='inputNotation' type="radio" name="qualiteGlobale" value='4' onChange={noteQualiteGlobale} />
                    <input className='inputNotation' type="radio" name="qualiteGlobale" value='5' onChange={noteQualiteGlobale} />
                </div>
                <div className='divCommunication'>
                    <label className='labelNotation' htmlFor="communication">2. La facilité de communication</label>
                    <input className='inputNotation' type="radio" name="communication" value='1' onChange={noteCommunication} />
                    <input className='inputNotation' type="radio" name="communication" value='2' onChange={noteCommunication} />
                    <input className='inputNotation' type="radio" name="communication" value='3' onChange={noteCommunication} />
                    <input className='inputNotation' type="radio" name="communication" value='4' onChange={noteCommunication} />
                    <input className='inputNotation' type="radio" name="communication" value='5' onChange={noteCommunication} />
                </div>
                <div className='divDossierTechnique'>
                    <label className='labelNotation' htmlFor="dossierTechnique">3. La qualité du dossier technique fournit</label>
                    <input className='inputNotation' type="radio" name="dossierTechnique" value='1' onChange={noteDossierTechnique} />
                    <input className='inputNotation' type="radio" name="dossierTechnique" value='2' onChange={noteDossierTechnique} />
                    <input className='inputNotation' type="radio" name="dossierTechnique" value='3' onChange={noteDossierTechnique} />
                    <input className='inputNotation' type="radio" name="dossierTechnique" value='4' onChange={noteDossierTechnique} />
                    <input className='inputNotation' type="radio" name="dossierTechnique" value='5' onChange={noteDossierTechnique} />
                </div>
                <div className='divExpertise'>
                    <label className='labelNotation' htmlFor="expertise">4. Le niveau d'expertise</label>
                    <input className='inputNotation' type="radio" name="expertise" value='1' onChange={noteExpertise} />
                    <input className='inputNotation' type="radio" name="expertise" value='2' onChange={noteExpertise} />
                    <input className='inputNotation' type="radio" name="expertise" value='3' onChange={noteExpertise} />
                    <input className='inputNotation' type="radio" name="expertise" value='4' onChange={noteExpertise} />
                    <input className='inputNotation' type="radio" name="expertise" value='5' onChange={noteExpertise} />
                </div>
                <div className='boutonsNotation'>
                    <button className='boutonRetour' onClick={retourNotation}>Retour</button>
                    <button className='boutonValider' onClick={validerNotations}>Valider</button>
                </div>
            </div>
        </>
    );
};

export default NoterPrestation;
