// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { Route, Router, Routes } from "react-router-dom";
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
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/kegiatan"
          element={
            <Layout>
              <Kegiatan />
            </Layout>
          }
        />
        <Route
          path="/keuangan"
          element={
            <Layout>
              <Keuangan />
            </Layout>
          }
        />
        <Route
          path="/dokumentasi"
          element={
            <Layout>
              <Dokumentasi />
            </Layout>
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
        <Route path="/tambah-kegiatan" element={<AddFormKegiatan />} />
        <Route path="/buat-laporan" element={<AddFormKeuangan />} />
        <Route path="/upload-dokumentasi" element={<AddFormDokumentasi />} />
      </Routes>
    </>
  );
}

export default App;
