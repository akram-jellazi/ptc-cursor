import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Wrench, Droplets, Thermometer, Shield, Clock, Award } from 'lucide-react'

const services = [
  {
    icon: Droplets,
    title: 'Réparation de fuites',
    description: 'Intervention rapide pour toutes vos fuites d\'eau, 24/7',
    color: 'bg-primary',
  },
  {
    icon: Wrench,
    title: 'Installation sanitaire',
    description: 'Installation complète de vos équipements sanitaires',
    color: 'bg-secondary',
  },
  {
    icon: Thermometer,
    title: 'Chauffage',
    description: 'Installation et réparation de systèmes de chauffage',
    color: 'bg-primary',
  },
  {
    icon: Droplets,
    title: 'Plomberie générale',
    description: 'Tous travaux de plomberie pour votre confort',
    color: 'bg-accent',
  },
  {
    icon: Shield,
    title: 'Dépannage d\'urgence',
    description: 'Service d\'urgence disponible 24h/24 et 7j/7',
    color: 'bg-secondary',
  },
  {
    icon: Wrench,
    title: 'Rénovation salle de bain',
    description: 'Rénovation complète de votre salle de bain',
    color: 'bg-primary',
  },
]

const features = [
  {
    icon: Clock,
    title: 'Intervention rapide',
    description: 'Disponible en moins de 2h',
  },
  {
    icon: Award,
    title: 'Artisans certifiés',
    description: 'Professionnels qualifiés et expérimentés',
  },
  {
    icon: Shield,
    title: 'Garantie travaux',
    description: 'Tous nos travaux sont garantis',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <img
                src="/logo-ptc.png"
                alt="Plomberie Travaux Confort"
                className="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Plomberie Travaux Confort
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Votre expert en plomberie pour tous vos besoins
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/devis"
                  className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Demander un devis
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Nous contacter
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-gray-600 text-lg">
              Des solutions complètes pour tous vos besoins en plomberie
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer group"
              >
                <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Besoin d'une intervention ?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Contactez-nous dès maintenant pour un devis gratuit
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Contactez-nous
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

