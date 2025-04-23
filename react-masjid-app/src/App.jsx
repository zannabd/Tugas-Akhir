// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Kegiatan from "./pages/Dashboard/Kegiatan";
import Keuangan from "./pages/Dashboard/Keuangan";
import Dokumentasi from "./pages/Dashboard/Dokumentasi";
import KegiatanPublic from "./pages/General/KegiatanPublic";
import PublicLayout from "./components/Layout/PublicLayout";
import KeuanganPublic from "./pages/General/KeuanganPublic";
import DokumentasiPublic from "./pages/General/DokumentasiPublic";
import AddFormKegiatan from "./components/FormAddEdit/addFormKegiatan";
import AddFormKeuangan from "./components/FormAddEdit/addFormKeuangan";
import AddFormDokumentasi from "./components/FormAddEdit/addFormDokumentasi";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const RequireAuth = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Layout>
                <Dashboard />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/kegiatan"
          element={
            <RequireAuth>
              <Layout>
                <Kegiatan />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/keuangan"
          element={
            <RequireAuth>
              <Layout>
                <Keuangan />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/dokumentasi"
          element={
            <RequireAuth>
              <Layout>
                <Dokumentasi />
              </Layout>
            </RequireAuth>
          }
        />
        <Route
          path="/kegiatan-public"
          element={
            <PublicLayout>
              <KegiatanPublic />
            </PublicLayout>
          }
        />
        <Route
          path="/keuangan-public"
          element={
            <PublicLayout>
              <KeuanganPublic />
            </PublicLayout>
          }
        />
        <Route
          path="/galeri-public"
          element={
            <PublicLayout>
              <DokumentasiPublic />
            </PublicLayout>
          }
        />
        <Route
          path="/form-kegiatan"
          element={
            <RequireAuth>
              <AddFormKegiatan />
            </RequireAuth>
          }
        />
        <Route
          path="/form-laporan"
          element={
            <RequireAuth>
              <AddFormKeuangan />
            </RequireAuth>
          }
        />
        <Route path="/form-dokumentasi" element={<AddFormDokumentasi />} />
      </Routes>
    </>
  );
}

export default App;
