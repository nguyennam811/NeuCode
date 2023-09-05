import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{marginTop: '100px'}}>{children}</div>
    </>
  );
};

export default Layout;
