import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../fireBase";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (userData.role !== "admin") {
    return <Navigate to="/" />;
  }
  

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Foydalanuvchilar Ro'yxati</h2>
      <table border="1" cellPadding="10" style={{ marginTop: "1rem", width: "100%" }}>
        <thead>
          <tr>
            <th>Ism</th>
            <th>Email</th>
            <th>Role</th>
            <th>UID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.uid}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.uid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
