import Logo from "../assets/Logo.png";
export default function Header() {
  return (
    <>
      <header className="header">
        <img src={Logo} alt="Logo" />
        <h1>TENZIES</h1>
      </header>
    </>
  );
}
