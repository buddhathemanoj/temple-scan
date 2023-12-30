import { db } from "./firebaseConfig"; 
import { doc, collection, getDoc,updateDoc } from "firebase/firestore"; // Add this line for necessary imports

const retrieveDataById = async (id) => {
  try {
    const docRef = doc(collection(db, "bookings"), id);
    
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Document data:", data);
      return data;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving document: ", error);
    throw error;
  }
};

const updateBookingDocument = async (bookingId, updatedData) => {
    try {
      const docRef = doc(collection(db, "bookings"), bookingId);
      await updateDoc(docRef, updatedData);
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  };
export { retrieveDataById,updateBookingDocument };
