import { use, useEffect, useState } from "react";
import AuthModal from "../components/AuthModal";
import LogoutButton from "../components/LogoutButton";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../api/api";
import axios from "axios";
import { redirect } from "react-router-dom";
import LinkShortner from "../components/LinkShortner";

export default function Home() {
  return (
    <>
      <main>
        <LogoutButton />
        <LinkShortner />
      </main>
    </>
  );
}
