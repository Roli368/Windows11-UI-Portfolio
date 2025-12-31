

// src/data/projects.js
export const projects = [
  {
    title: "Sanjeevani",
    subtitle: "Disaster Management & Early Warning Platform",
    description: "An IoT-based predictive system that utilizes environmental and healthcare data to forecast water-borne disease risks. Engineered ML models for spatial hotspot prediction and real-time data visualization dashboards.",
    tech: "Node.js, Express.js, MongoDB, Flask, Scikit-learn, Pandas, Joblib",
    achievement: "3rd Position - Internal SIH 2025",
    github: "https://github.com/Anuj-Pratap-Singh12/Smart-Health-App",
    video: "/assets/videos/sanjeevani_demo.mp4", 
    image: "/assets/sanjeevani.png", 
    category: "AI/ML & IoT"
  },
  {
  title: "NovaSOC",
  subtitle: "Security Operations Dashboard",
  description: "A real-time security monitoring application that implements machine learning to detect and classify 6+ attack categories. Engineered backend logic to correlate large log volumes in real-time, reducing incident handling time by 40%.",
  tech: "Next.js, Node.js, Express.js, MongoDB, WebSockets, Flask, scikit-learn",
  github: "https://github.com/vaishnavipal1/NovaSOC", // Update with specific link if different
  image: "/assets/nova.png", // Suggested image path
  category: "Cybersecurity & ML"
},
  {
    title: "Anant Yatra",
    subtitle: "Enterprise Car Booking Application",
    description: "A booking platform featuring real-time fare estimation and distance calculation via OpenStreetMap and OSRM. Designed with a high-performance React frontend and interactive driver/customer modules.",
    tech: "React.js, Tailwind CSS, OpenStreetMap, OSRM, Vercel",
    github: "https://github.com/Roli368/ANANT-YATRA-car-booking-app-",
    liveDemo: "https://anant-yatra-car-booking-app.vercel.app", 
    video: "/assets/videos/car.mp4", 
    image: "/assets/car.png", // Updated: Matches file 'anant.png' exactly
    category: "Frontend",
    isPlaying: true
  },

  {
  title: "Dropify",
  subtitle: "Interactive Music Streaming UI",
  description: "A high-fidelity music streaming interface featuring a functional audio player, playlist navigation, and library management. Built with a focus on seamless user interaction and responsive CSS layouts.",
  tech: "HTML5, CSS3, JavaScript (ES6+)",
  github: "https://github.com/Roli368/Dropify",
  liveDemo: "https://darling-cannoli-a7320a.netlify.app/", 
  video: "/assets/videos/dropify.mp4",
  image: "/assets/dropify.png", 
  category: "Web development",
  isPlaying: true // We can use this flag in the UI to trigger animations
},


{
  title: "SMS Spam Detector",
  subtitle: "NLP-based Message Classifier",
  description: "Developed an end-to-end NLP system to classify messages as spam or ham with high precision. Implemented text preprocessing, TF-IDF vectorization, and trained multiple ML models to ensure robust detection.",
  tech: "Python, Scikit-learn, NLTK, Pandas, Streamlit",
  github: "https://github.com/Roli368/spam-classifier",
  image: "/assets/spam.png", 
  video: "/assets/videos/spam.mp4",
   liveDemo: "https://sapm-classifier.netlify.app",  
  category: "AI/ML & NLP",
  isPlaying: true
}
];









