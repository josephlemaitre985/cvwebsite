import React, { useState } from 'react';
import './SellForm.css';

function SellForm() {
    const [formData, setFormData] = useState({
        model: '',
        condition: '',
        photos: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photos: e.target.files
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Affichez les données dans la console pour vérifier
        console.log(formData);
        // Ici, vous ajouterez la logique pour envoyer les données au serveur
        alert("Form submitted! Check console for data.");
    };

    return (
        <div className="sell-form-container">
            <h2>Revendez vos produits</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Modèle du produit:</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>État du produit:</label>
                    <input
                        type="text"
                        name="condition"
                        value={formData.condition}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Télécharger des photos:</label>
                    <input
                        type="file"
                        name="photos"
                        multiple
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Soumettre</button>
            </form>
        </div>
    );
}

export default SellForm;
