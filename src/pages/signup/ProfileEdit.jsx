// src/pages/ProfileEdit.jsx
import { useState } from "react";
import { auth, db, storage } from "../../fireBase";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ProfileEdit = () => {
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName || "");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const handleUpdate = async () => {
    try {
      // displayName yangilash
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name });
        await updateDoc(doc(db, "users", user.uid), { name });
      }

      // parol yangilash
      if (password) {
        await updatePassword(user, password);
      }

      // avatar yuklash
      if (avatarFile) {
        const storageRef = ref(storage, `avatars/${user.uid}_${Date.now()}`);
        await uploadBytes(storageRef, avatarFile);
        const photoURL = await getDownloadURL(storageRef);
        await updateProfile(user, { photoURL });
        await updateDoc(doc(db, "users", user.uid), { photoURL });
      }

      alert("Ma’lumotlar yangilandi!");
    } catch (error) {
      alert("Xatolik: " + error.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Profilni Tahrirlash</h2>

      <div>
        <label>Yangi ism:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Yangi parol:</label>
        <input
          type="password"
          value={password}
          placeholder="Parol (ixtiyoriy)"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label>Avatar:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files[0])}
        />
      </div>

      <button onClick={handleUpdate}>Saqlash</button>
    </div>
  );
};

export default ProfileEdit;
