import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, CheckCircle, ArrowRight } from 'lucide-react'

const serviceTypes = [
  { id: 'reparation', label: 'R├®paration', icon: '­ƒöº' },
  { id: 'installation', label: 'Installation', icon: 'ÔÜÖ´©Å' },
  { id: 'depannage', label: 'D├®pannage d\'urgence', icon: '­ƒÜ¿' },
  { id: 'renovation', label: 'R├®novation', icon: '­ƒÅá' },
  { id: 'chauffage', label: 'Chauffage', icon: '­ƒöÑ' },
  { id: 'autre', label: 'Autre', icon: '­ƒôï' },
]

const urgencyLevels = [
  { id: 'normal', label: 'Normal', price: 0 },
  { id: 'urgent', label: 'Urgent (24h)', price: 50 },
  { id: 'tres-urgent', label: 'Tr├¿s urgent (< 2h)', price: 100 },
]

export default function Devis() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    serviceType: '',
    urgency: 'normal',
    address: '',
    description: '',
    name: '',
    email: '',
    phone: '',
    date: '',
  })
  const [estimatedPrice, setEstimatedPrice] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const calculateEstimate = () => {
    let basePrice = 0
    
    // Base price by service type
    const servicePrices = {
      reparation: 80,
      installation: 150,
      depannage: 120,
      renovation: 500,
      chauffage: 200,
      autre: 100,
    }
    
    basePrice = servicePrices[formData.serviceType] || 100
    
    // Add urgency fee
    const urgencyFee = urgencyLevels.find(u => u.id === formData.urgency)?.price || 0
    basePrice += urgencyFee
    
    // Add description complexity (rough estimate)
    if (formData.description.length > 200) {
      basePrice += 50
    }
    
    setEstimatedPrice(basePrice)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 3) {
      calculateEstimate()
      setStep(4)
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.serviceType !== ''
      case 2:
        return formData.address !== '' && formData.description !== ''
      case 3:
        return formData.name !== '' && formData.email !== '' && formData.phone !== ''
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4">
            <Calculator className="text-white" size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Demande de devis
          </h1>
          <p className="text-gray-600 text-lg">
            Obtenez une estimation gratuite en quelques minutes
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > s ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Service</span>
            <span>D├®tails</span>
            <span>Contact</span>
            <span>R├®sultat</span>
          </div>
        </div>

        {/* Form Steps */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                  Quel type de service recherchez-vous ?
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {serviceTypes.map((service) => (
                    <motion.button
                      key={service.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, serviceType: service.id })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.serviceType === service.id
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <div className="font-medium text-gray-900">{service.label}</div>
                    </motion.button>
                  ))}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niveau d'urgence
                  </label>
                  <div className="space-y-2">
                    {urgencyLevels.map((level) => (
                      <label
                        key={level.id}
                        className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={level.id}
                          checked={formData.urgency === level.id}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{level.label}</div>
                          {level.price > 0 && (
                            <div className="text-sm text-gray-600">
                              +{level.price}Ôé¼ de frais d'urgence
                            </div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                  D├®tails de l'intervention
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse de l'intervention
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="123 Rue de la Plomberie, 75000 Paris"
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Date souhait├®e (optionnel)
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description du probl├¿me / travaux
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="D├®crivez en d├®tail votre besoin..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                  Vos coordonn├®es
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      T├®l├®phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="01 23 45 67 89"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
                >
                  <CheckCircle className="text-green-600" size={40} />
                </motion.div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                  Estimation de votre devis
                </h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-primary to-cyan-500 text-white rounded-lg p-8 mb-6"
                >
                  <div className="text-5xl font-bold mb-2">
                    {estimatedPrice}Ôé¼
                  </div>
                  <div className="text-blue-100">
                    Estimation indicative (hors TVA)
                  </div>
                </motion.div>
                <p className="text-gray-600 mb-6">
                  Cette estimation est indicative. Un devis d├®taill├® vous sera envoy├® par email apr├¿s analyse de votre demande.
                </p>
                <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
                  <h3 className="font-semibold mb-3 text-gray-900">R├®capitulatif</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-medium">
                        {serviceTypes.find(s => s.id === formData.serviceType)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Urgence:</span>
                      <span className="font-medium">
                        {urgencyLevels.find(u => u.id === formData.urgency)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Adresse:</span>
                      <span className="font-medium">{formData.address}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => {
                    setStep(1)
                    setFormData({
                      serviceType: '',
                      urgency: 'normal',
                      address: '',
                      description: '',
                      name: '',
                      email: '',
                      phone: '',
                      date: '',
                    })
                    setEstimatedPrice(null)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  Nouveau devis
                  <ArrowRight size={20} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <motion.button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                whileHover={{ scale: step > 1 ? 1.05 : 1 }}
                whileTap={{ scale: step > 1 ? 0.95 : 1 }}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  step === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pr├®c├®dent
              </motion.button>
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid()}
                whileHover={{ scale: isStepValid() ? 1.05 : 1 }}
                whileTap={{ scale: isStepValid() ? 0.95 : 1 }}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 ${
                  isStepValid()
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {step === 3 ? 'Calculer l\'estimation' : 'Suivant'}
                <ArrowRight size={20} />
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

