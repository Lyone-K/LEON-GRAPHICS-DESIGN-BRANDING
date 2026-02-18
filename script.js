// ============================================================
//  LEON Graphics Design — script.js
//  Firebase Firestore + Auth · Rating System · UI Helpers
// ============================================================

// --- FIREBASE IMPORTS ---
import { initializeApp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// --- FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyAI1renRwVxkIz9Zd2Oi7l09CDkcoT5Lj0",
  authDomain: "leon-graphics-ratings-v2.firebaseapp.com",
  projectId: "leon-graphics-ratings-v2",
  storageBucket: "leon-graphics-ratings-v2.firebasestorage.app",
  messagingSenderId: "601026583913",
  appId: "1:601026583913:web:3d5700e72e4ec1f7a931f8",
  measurementId: "G-B2RQKW50HQ"
};

// ── Initialize Firebase ──
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);
const auth = getAuth(app);

let currentUser = null;
let hasRated = false; // Prevent duplicate ratings per session

// ── Anonymous Auth ──
signInAnonymously(auth)
  .catch(err => console.error("Auth error:", err));

onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    console.log("✅ Firebase Auth:", user.uid);
    initRatingSystem();
  }
});

// ── Rating System ──
async function initRatingSystem() {
  // Always show current average on load
  await updateAvgDisplay();

  // Check sessionStorage to prevent re-rating on page refresh
  if (sessionStorage.getItem('leon-rated')) {
    hasRated = true;
    const saved = parseInt(sessionStorage.getItem('leon-rated'));
    highlightStars(saved);
    const msg = document.getElementById('rating-message');
    if (msg) {
      msg.textContent = 'You already rated this session — thank you! ✦';
      msg.classList.add('rated');
    }
  }

  // Listen for the custom event fired by inline script
  document.addEventListener('userRated', async (e) => {
    if (hasRated) {
      if (window.leonShowToast) window.leonShowToast('You have already rated this session!');
      return;
    }

    const value = e.detail.value;
    hasRated = true;
    sessionStorage.setItem('leon-rated', value);

    try {
      await addDoc(collection(db, "ratings"), {
        rating: value,
        timestamp: new Date(),
        uid: currentUser?.uid || "anonymous",
        page: window.location.pathname
      });
      console.log("✅ Rating saved:", value);
      await updateAvgDisplay();
    } catch (err) {
      console.error("❌ Save error:", err);
      if (window.leonShowToast) window.leonShowToast('Could not save rating. Please try again.');
    }
  });
}

// ── Compute & Display Average ──
async function updateAvgDisplay() {
  try {
    const snapshot = await getDocs(collection(db, "ratings"));
    if (snapshot.empty) {
      if (window.leonUpdateAvgDisplay) window.leonUpdateAvgDisplay('–.–', 0);
      return;
    }
    let total = 0;
    snapshot.forEach(doc => { total += doc.data().rating; });
    const avg  = (total / snapshot.size).toFixed(1);
    const count = snapshot.size;
    if (window.leonUpdateAvgDisplay) window.leonUpdateAvgDisplay(avg, count);
  } catch (err) {
    console.error("❌ Fetch error:", err);
  }
}

// ── Highlight stars by value ──
function highlightStars(value) {
  const stars = document.querySelectorAll('.star');
  stars.forEach((s, i) => s.classList.toggle('active', i < value));
}