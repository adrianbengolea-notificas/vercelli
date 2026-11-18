import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirebaseDb, getFirebaseStorage, isFirebaseConfigured } from "./client";

export async function submitCollection(name: string, payload: Record<string, unknown>) {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase no está configurado en este entorno.");
  }
  const db = getFirebaseDb();
  if (!db) throw new Error("No se pudo inicializar Firestore.");
  const docRef = await addDoc(collection(db, name), {
    ...payload,
    status: "recibido",
    createdAt: serverTimestamp(),
    source: "web-publica",
  });
  return docRef.id;
}

export async function uploadPrivateFile(path: string, file: File) {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Storage no está configurado.");
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file, { contentType: file.type });
  return getDownloadURL(fileRef);
}
