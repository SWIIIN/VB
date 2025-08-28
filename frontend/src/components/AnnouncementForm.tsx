import React, { useState } from 'react';
import { X, Package, MapPin, Calendar, DollarSign, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { MOROCCAN_CITIES, PACKAGE_TYPES, APP_LIMITS, ERROR_MESSAGES } from '../constants';

interface AnnouncementFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (announcement: AnnouncementData) => Promise<void>;
}

interface AnnouncementData {
  title: string;
  description: string;
  departure: string;
  arrival: string;
  date: string;
  packageType: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  price: number;
  isUrgent: boolean;
  contactPhone: string;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<AnnouncementData>({
    title: '',
    description: '',
    departure: '',
    arrival: '',
    date: '',
    packageType: '',
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
    price: 0,
    isUrgent: false,
    contactPhone: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Validation du titre
    if (!formData.title.trim()) {
      newErrors.title = ERROR_MESSAGES.REQUIRED_FIELD;
    } else if (formData.title.length > APP_LIMITS.MAX_TITLE_LENGTH) {
      newErrors.title = `Le titre ne peut pas dépasser ${APP_LIMITS.MAX_TITLE_LENGTH} caractères`;
    }

    // Validation de la description
    if (!formData.description.trim()) {
      newErrors.description = ERROR_MESSAGES.REQUIRED_FIELD;
    } else if (formData.description.length > APP_LIMITS.MAX_DESCRIPTION_LENGTH) {
      newErrors.description = `La description ne peut pas dépasser ${APP_LIMITS.MAX_DESCRIPTION_LENGTH} caractères`;
    }

    // Validation des villes
    if (!formData.departure) {
      newErrors.departure = 'Ville de départ requise';
    }
    if (!formData.arrival) {
      newErrors.arrival = 'Ville d\'arrivée requise';
    }
    if (formData.departure === formData.arrival && formData.departure !== '') {
      newErrors.arrival = 'Les villes de départ et d\'arrivée doivent être différentes';
    }

    // Validation de la date
    if (!formData.date) {
      newErrors.date = 'Date requise';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'La date ne peut pas être dans le passé';
      }
    }

    // Validation du type de colis
    if (!formData.packageType) {
      newErrors.packageType = 'Type de colis requis';
    }

    // Validation du poids
    if (formData.weight <= 0) {
      newErrors.weight = 'Le poids doit être supérieur à 0';
    } else if (formData.weight > APP_LIMITS.MAX_PACKAGE_WEIGHT) {
      newErrors.weight = `Le poids ne peut pas dépasser ${APP_LIMITS.MAX_PACKAGE_WEIGHT}kg`;
    }

    // Validation des dimensions
    if (formData.dimensions.length <= 0 || formData.dimensions.width <= 0 || formData.dimensions.height <= 0) {
      newErrors.dimensions = 'Toutes les dimensions doivent être supérieures à 0';
    } else {
      const totalDimensions = formData.dimensions.length + formData.dimensions.width + formData.dimensions.height;
      if (totalDimensions > APP_LIMITS.MAX_PACKAGE_DIMENSIONS) {
        newErrors.dimensions = `La somme des dimensions ne peut pas dépasser ${APP_LIMITS.MAX_PACKAGE_DIMENSIONS}cm`;
      }
    }

    // Validation du prix
    if (formData.price <= 0) {
      newErrors.price = 'Le prix doit être supérieur à 0';
    } else if (formData.price > 10000) {
      newErrors.price = 'Le prix ne peut pas dépasser 10,000 MAD';
    }

    // Validation du téléphone
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Numéro de téléphone requis';
    } else if (formData.contactPhone.length < 10) {
      newErrors.contactPhone = 'Numéro de téléphone invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await onSubmit(formData);
      setSuccessMessage('Annonce créée avec succès !');
      
      // Reset du formulaire après 2 secondes
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
        setFormData({
          title: '',
          description: '',
          departure: '',
          arrival: '',
          date: '',
          packageType: '',
          weight: 0,
          dimensions: { length: 0, width: 0, height: 0 },
          price: 0,
          isUrgent: false,
          contactPhone: ''
        });
      }, 2000);
    } catch (error) {
      setErrors({ general: 'Erreur lors de la création de l\'annonce. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Clear specific field error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.startsWith('dimensions.')) {
      const dimensionKey = name.split('.')[1] as keyof typeof formData.dimensions;
      setFormData(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimensionKey]: parseFloat(value) || 0
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value
      }));
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      departure: '',
      arrival: '',
      date: '',
      packageType: '',
      weight: 0,
      dimensions: { length: 0, width: 0, height: 0 },
      price: 0,
      isUrgent: false,
      contactPhone: ''
    });
    setErrors({});
    setSuccessMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Créer une annonce</h2>
              <p className="text-gray-600 mt-1">Publiez votre demande de transport</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              aria-label="Fermer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {successMessage && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2 text-green-700">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errors.general && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Titre et Description */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Titre de l'annonce *
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                  errors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                }`}
                placeholder="Ex: Transport urgent Casablanca → Marrakech"
                maxLength={APP_LIMITS.MAX_TITLE_LENGTH}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                {formData.title.length}/{APP_LIMITS.MAX_TITLE_LENGTH} caractères
              </p>
            </div>

            <div>
              <label htmlFor="packageType" className="block text-sm font-semibold text-gray-700 mb-2">
                Type de colis *
              </label>
              <select
                id="packageType"
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                  errors.packageType ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                }`}
              >
                <option value="">Sélectionner un type</option>
                {PACKAGE_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.packageType && (
                <p className="mt-1 text-sm text-red-600">{errors.packageType}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description détaillée *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
              }`}
              placeholder="Décrivez votre colis, contraintes particulières, etc."
              maxLength={APP_LIMITS.MAX_DESCRIPTION_LENGTH}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length}/{APP_LIMITS.MAX_DESCRIPTION_LENGTH} caractères
            </p>
          </div>

          {/* Villes et Date */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="departure" className="block text-sm font-semibold text-gray-700 mb-2">
                Ville de départ *
              </label>
              <select
                id="departure"
                name="departure"
                value={formData.departure}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                  errors.departure ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                }`}
              >
                <option value="">Sélectionner</option>
                {MOROCCAN_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.departure && (
                <p className="mt-1 text-sm text-red-600">{errors.departure}</p>
              )}
            </div>

            <div>
              <label htmlFor="arrival" className="block text-sm font-semibold text-gray-700 mb-2">
                Ville d'arrivée *
              </label>
              <select
                id="arrival"
                name="arrival"
                value={formData.arrival}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                  errors.arrival ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                }`}
              >
                <option value="">Sélectionner</option>
                {MOROCCAN_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.arrival && (
                <p className="mt-1 text-sm text-red-600">{errors.arrival}</p>
              )}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                Date souhaitée *
              </label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                  errors.date ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Poids et Dimensions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="weight" className="block text-sm font-semibold text-gray-700 mb-2">
                Poids (kg) *
              </label>
              <input
                id="weight"
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="0.1"
                max={APP_LIMITS.MAX_PACKAGE_WEIGHT}
                step="0.1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                  errors.weight ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                }`}
                placeholder="Ex: 5.5"
              />
              {errors.weight && (
                <p className="mt-1 text-sm text-red-600">{errors.weight}</p>
              )}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                Prix proposé (MAD) *
              </label>
              <input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                max="10000"
                step="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                  errors.price ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                }`}
                placeholder="Ex: 150"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dimensions (cm) *
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <input
                  type="number"
                  name="dimensions.length"
                  value={formData.dimensions.length}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  step="1"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                    errors.dimensions ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                  }`}
                  placeholder="Longueur"
                />
                <p className="mt-1 text-xs text-gray-500 text-center">Longueur</p>
              </div>
              <div>
                <input
                  type="number"
                  name="dimensions.width"
                  value={formData.dimensions.width}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  step="1"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                    errors.dimensions ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                  }`}
                  placeholder="Largeur"
                />
                <p className="mt-1 text-xs text-gray-500 text-center">Largeur</p>
              </div>
              <div>
                <input
                  type="number"
                  name="dimensions.height"
                  value={formData.dimensions.height}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  step="1"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                    errors.dimensions ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                  }`}
                  placeholder="Hauteur"
                />
                <p className="mt-1 text-xs text-gray-500 text-center">Hauteur</p>
              </div>
            </div>
            {errors.dimensions && (
              <p className="mt-1 text-sm text-red-600">{errors.dimensions}</p>
            )}
          </div>

          {/* Contact et Options */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                Téléphone de contact *
              </label>
              <input
                id="contactPhone"
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                  errors.contactPhone ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-red-500'
                }`}
                placeholder="+212 6XX-XXX-XXX"
              />
              {errors.contactPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isUrgent"
                  checked={formData.isUrgent}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Transport urgent</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Création en cours...</span>
                </>
              ) : (
                <>
                  <Package className="h-5 w-5" />
                  <span>Créer l'annonce</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;
