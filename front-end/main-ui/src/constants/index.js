import {
  benefitIcon1,

  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Courses",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "About Us",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "Sign Up",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Log in",
    url: "#login",
    onlyMobile: true,
  },
];

export const navigationStudent = [
  {
    id: "0",
    title: "Dashboard",
    url: "#features",
  },
  {
    id: "1",
    title: "Progress",
    url: "#pricing",
  },
  {
    id: "2",
    title: "Profile",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Notifications",
    url: "#roadmap",
  },

  {
    id: "5",
    title: "Log out",
    url: "#login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const edunovaServices = [
  "Generación de fotos",
  "Mejora de fotos",
  "Integración perfecta",
];

export const edunovaServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Reconocimiento de voz",
    text: "Permitir que el chatbot entienda y responda a comandos de voz, facilitando la interacción con la app sin necesidad de usar las manos.",
    date: "Mayo 2023",
    status: "hecho",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamificación",
    text: "Añadir elementos similares a juegos, como insignias o tablas de clasificación, para incentivar a los usuarios a interactuar con el chatbot con mayor frecuencia.",
    date: "Mayo 2023",
    status: "en progreso",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Personalización del chatbot",
    text: "Permitir a los usuarios personalizar la apariencia y el comportamiento del chatbot, haciéndolo más atractivo y divertido de usar.",
    date: "Mayo 2023",
    status: "hecho",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integración con APIs",
    text: "Permitir que el chatbot acceda a fuentes de datos externas, como APIs de clima o noticias, para ofrecer recomendaciones más relevantes.",
    date: "Mayo 2023",
    status: "en progreso",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "Con automatización inteligente y seguridad de primera clase, es la solución perfecta para equipos que buscan trabajar de manera más eficiente.";

export const collabContent = [
  {
    id: "0",
    title: "Integración Perfecta",
    text: collabText,
  },
  {
    id: "1",
    title: "Automatización Inteligente",
  },
  {
    id: "2",
    title: "Seguridad de Primera Clase",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Básico",
    description: "Chatbot de IA, recomendaciones personalizadas",
    price: "0",
    features: [
      "Un chatbot de IA que puede entender tus consultas",
      "Recomendaciones personalizadas basadas en tus preferencias",
      "Capacidad de explorar la app y sus funciones sin ningún costo",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description:
      "Chatbot de IA avanzado, soporte prioritario, panel de análisis",
    price: "9.99",
    features: [
      "Un chatbot de IA avanzado que puede entender consultas complejas",
      "Un panel de análisis para seguir tus conversaciones",
      "Soporte prioritario para resolver problemas rápidamente",
    ],
  },
  {
    id: "2",
    title: "Empresarial",
    description:
      "Chatbot de IA personalizado, análisis avanzados, cuenta dedicada",
    price: null,
    features: [
      "Un chatbot de IA que puede entender tus consultas",
      "Recomendaciones personalizadas basadas en tus preferencias",
      "Capacidad de explorar la app y sus funciones sin ningún costo",
    ],
  },
];

export const benefits = [
  {
    id: "COMP3010",
    title: "Distributed Systems",
    text: "This course explores the principles and technologies behind distributed systems, focusing on network communication, synchronization, fault tolerance, and scalability.",
    backgroundUrl: "src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "ASTR1080",
    title: "Introduction to astronomy",
    text: "explore the fundamentals of astronomy, including the study of stars, planets, galaxies, and the universe's structure.",
    backgroundUrl: "src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    light: true,
  },
  // {
  //   id: "2",
  //   title: "Conéctate desde cualquier lugar",
  //   text: "Accede al chatbot de IA desde cualquier dispositivo y en cualquier lugar, haciéndolo más accesible y conveniente.",
  //   backgroundUrl: "src/assets/benefits/card-3.svg",
  //   iconUrl: benefitIcon3,
  //   imageUrl: benefitImage2,
  // },
  // {
  //   id: "3",
  //   title: "Respuestas inmediatas",
  //   text: "Obtén respuestas rápidamente sin tener que buscar en múltiples fuentes.",
  //   backgroundUrl: "src/assets/benefits/card-4.svg",
  //   iconUrl: benefitIcon4,
  //   imageUrl: benefitImage2,
  //   light: true,
  // },
  // {
  //   id: "4",
  //   title: "Pregunta lo que quieras",
  //   text: "Encuentra respuestas al instante sin necesidad de explorar múltiples fuentes.",
  //   backgroundUrl: "src/assets/benefits/card-5.svg",
  //   iconUrl: benefitIcon1,
  //   imageUrl: benefitImage2,
  // },
  // {
  //   id: "5",
  //   title: "Mejora constante",
  //   text: "La app utiliza inteligencia artificial para comprender tus consultas y ofrecerte las mejores respuestas.",
  //   backgroundUrl: "src/assets/benefits/card-6.svg",
  //   iconUrl: benefitIcon2,
  //   imageUrl: benefitImage2,
  // },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
