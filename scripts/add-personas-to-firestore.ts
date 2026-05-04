// Use require instead of import for better compatibility with Node.js
const { personas } = require('../lib/personas.ts');
const { addPersona } = require('../lib/firestore.ts');
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

// Import Firebase config
const { firebaseConfig } = require('../lib/firebase.ts');

// Initialize Firebase
initializeApp(firebaseConfig);

/**
 * Script to add all personas from the static list to Firestore
 */
async function addPersonasToFirestore() {
  console.log('Starting to add personas to Firestore...');
  
  try {
    // Add each persona to Firestore
    for (const persona of personas) {
      console.log(`Adding persona: ${persona.name} (${persona.id})`);
      
      // You can update these image URLs manually later if needed
      // Currently using the relative paths from the static personas
      const imageUrl = persona.image;
      
      await addPersona({
        id: persona.id,
        name: persona.name,
        description: persona.description,
        image: imageUrl, // This will be the relative path like '/personas/space.png'
        prompt: persona.prompt
      });
      console.log(`✅ Added ${persona.name}`);
      
      // Small delay to avoid overwhelming Firestore
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    console.log('✅ All personas have been added to Firestore successfully!');
    console.log('NOTE: You may need to update the image URLs manually in the Firestore console');
  } catch (error) {
    console.error('❌ Error adding personas to Firestore:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
}

// Run the script
addPersonasToFirestore();
