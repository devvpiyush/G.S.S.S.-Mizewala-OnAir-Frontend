// Master Hooks of Secuity
import { BSF, BRTSF } from "@/security/Sanitizers";

// 1. BSF (Basic Sanitization Function)
export const useBSF = (string) => {
  return BSF(string);
};

// 2. BRTSF (Basic Rich Text Sanitization Function)
export const useBRTSF = (content) => {
  return BRTSF(content);
};
