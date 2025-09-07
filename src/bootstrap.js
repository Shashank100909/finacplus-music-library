import React from "react";
import { createRoot } from "react-dom/client"; 
import LibraryApp from "./exposed/LibraryApp";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<LibraryApp />);
