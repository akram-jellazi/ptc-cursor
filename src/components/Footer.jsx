import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo-ptc.png"
                alt="Plomberie Travaux Confort"
                className="h-10 w-10 object-contain"
              />
              <h3 className="text-xl font-bold">Plomberie Travaux Confort</h3>
            </div>
            <p className="text-gray-400">
              Votre partenaire de confiance pour tous vos travaux de plomberie.
              Professionnalisme et qualité garantis.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/devis" className="text-gray-400 hover:text-white transition-colors">
                  Devis gratuit
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={18} />
                <span>06 85 90 22 15</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={18} />
                <span>ptcservices27@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} />
                <span>15 rue de Paris, 27510 Tilly</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Plomberie Travaux Confort. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

