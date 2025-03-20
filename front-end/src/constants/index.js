import {
  benefitIcon1,
 
  cardbg,
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

export const url = "http://localhost:3001"



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

export const navigationChatStudent = [
  {
    id: "0",
    title: "Back to Course",
    url: "/course",
  },
  
  
  {
    id: "1",
    title: "Unit 1",
    url: "#features",
  },

  {
    id: "2",
    title: "Save Session",
    url: "#login",

  },
];

export const navigationCourseStudent = [
  {
    id: "0",
    title: "Back to Course",
    url: "/course",
  },
  
  
  {
    id: "1",
    title: "Unit 1",
    url: "#features",
  },

  {
    id: "2",
    title: "Save Session",
    url: "#login",

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

export const cardDesign = [benefitIcon1, cardbg];

export const benefits = [
  {
    id: "COMP3010",
    title: "Distributed Systems",
    text: "This course explores the principles and technologies behind distributed systems, focusing on network communication, synchronization, fault tolerance, and scalability.",
    backgroundUrl: "src/assets/course_cards/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: cardbg,
  },
  {
    id: "ASTR1080",
    title: "Introduction to astronomy",
    text: "explore the fundamentals of astronomy, including the study of stars, planets, galaxies, and the universe's structure.",
    backgroundUrl: "src/assets/course_cards/card-2.svg",
    iconUrl: benefitIcon1,
    imageUrl: cardbg,
  },
  
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

export const majors = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Data Science",
  "Software Engineering",
  "Information Technology",
  "Business Administration",
  "Marketing",
  "Psychology",
  "Economics",
  "Physics",
  "Mathematics",
  "Biology",
  "Environmental Science",
  "Chemistry",
  "Political Science",
  "Sociology",
  "Philosophy",
  "Linguistics",
];

export const gpaOptions = [
  { value: "less_than_2", label: "Less than 2" },
  { value: "2_to_2_5", label: "2 to 2.5" },
  { value: "2_5_to_3", label: "2.5 to 3" },
  { value: "3_to_3_5", label: "3 to 3.5" },
  { value: "3_5_to_4", label: "3.5 to 4" },
  { value: "4_to_4_5", label: "4 to 4.5" },
  { value: "4_5_plus", label: "4.5+" }
];

export const locationOptions = ["Toronto", "Vancouver", "Montreal", "Calgary", "Winnipeg"];

export const languageOptions = ["English", "French"];

export const learningStyleOptions = [
  { value: "memorization", label: "Memorization" },
  { value: "graphical", label: "Graphical" },
  { value: "visual", label: "Visual" },
  { value: "repetition", label: "Repetition" },
  { value: "active_recall", label: "Active Recall" },
  { value: "hands_on", label: "Hands-on Practice" },
  { value: "auditory", label: "Auditory" }
];

export const getCourseDetails = (course) => [
  { label: "Course Code", value: course?.course_id || "N/A" },
  { label: "Instructor", value: course?.instructor || "N/A" },
  { label: "Total Students", value: course?.size || "N/A" },
  { label: "Enrolled On", value: "09/11/2024" }, // Static value
];