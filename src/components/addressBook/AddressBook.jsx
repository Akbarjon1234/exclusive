import "./AddressBook.css";
import { useState, useEffect } from "react";

const AddressBook = () => {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [message, setMessage] = useState("");
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addressInfo"));
    if (saved) {
      setFullName(saved.fullName || "");
      setAddress(saved.address || "");
      setCity(saved.city || "");
      setPostalCode(saved.postalCode || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "addressInfo",
      JSON.stringify({ fullName, address, city, postalCode })
    );
  }, [fullName, address, city, postalCode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !address || !city || !postalCode) {
      setMessage("Iltimos, barcha maydonlarni to‘ldiring.");
      setShowSaved(false);
    } else {
      setMessage("Manzil muvaffaqiyatli saqlandi!");
      setShowSaved(true);
    }
  };

  return (
    <div className="address-container">
      <h1>Address Book</h1>

      <form className="address-form" onSubmit={handleSubmit}>
        <label>
          To‘liq ism:
          <input
            type="text"
            placeholder="Ism Familiya"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>

        <label>
          Ko‘cha va uy raqami:
          <input
            type="text"
            placeholder="Ko‘cha nomi, Uy raqami"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <label>
          Shahar:
          <input
            type="text"
            placeholder="Toshkent, Andijon..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label>
          Pochta indeksi:
          <input
            type="text"
            placeholder="100011"
            value={postalCode}
            onChange={(e) =>
              setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
          />
        </label>

        <button type="submit">Saqlash</button>
        {message && <p className="address-message">{message}</p>}
      </form>

      {showSaved && (
        <div className="saved-address">
          <h3>Saqlangan manzil:</h3>
          <p>
            <strong>Ism:</strong> {fullName}
          </p>
          <p>
            <strong>Manzil:</strong> {address}
          </p>
          <p>
            <strong>Shahar:</strong> {city}
          </p>
          <p>
            <strong>Indeks:</strong> {postalCode}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
